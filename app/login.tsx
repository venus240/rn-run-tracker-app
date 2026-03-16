import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "@/service/supabase";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { router } from "expo-router";
import * as QueryString from "query-string";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const redirectUri = makeRedirectUri({
        scheme: "rnruntrackerapp",
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      if (error) console.log("Error:", error.message);

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUri,
        );

        if (result.type === "success") {
          const { url } = result;
          const params = url.split("#")[1];
          const formData = QueryString.parse(params);
          const access_token = formData.access_token as string;
          const refresh_token = formData.refresh_token as string;

          if (access_token && refresh_token) {
            const { data: sessionData, error: sessionError } =
              await supabase.auth.setSession({
                access_token,
                refresh_token,
              });

            if (sessionError) throw sessionError;
            const {
              data: { user },
            } = await supabase.auth.getUser();

            if (user) {
              router.replace({
                pathname: "/run",
                params: { uid: user.id },
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("Error details:", error);
      Alert.alert(
        "เกิดข้อผิดพลาด",
        "ไม่สามารถเข้าสู่ระบบด้วย Google ได้ กรุณาลองอีกครั้ง",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เข้าสู่ระบบ</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/google-logo.png")}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.buttonText}>เข้าสู่ระบบด้วย Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  logoContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleIcon: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },
});
