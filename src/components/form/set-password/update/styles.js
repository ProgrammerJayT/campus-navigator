import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },

  formContainer: {
    flexGrow: 1,
    padding: 10,
  },

  textInput: {
    borderColor: AppColors.dark,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
  },

  inputError: {
    textAlign: "center",
    color: "red",
    fontSize: 12,
  },
});
