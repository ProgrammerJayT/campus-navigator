import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  container: {
    flex: 1,
  },

  formContainer: {
    flexGrow: 1,
    padding: 25,
  },

  logo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 50,
  },

  textInput: {
    borderColor: "#000000",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  error: {
    textAlign: "center",
    color: "red",
    fontSize: 12,
    marginBottom: 0,
  },
});
