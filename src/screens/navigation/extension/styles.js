import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.success,
    zIndex: 1,
    width: "100%",
  },

  button: {
    alignSelf: "center",
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },

  buttonText: {
    color: AppColors.background,
    fontWeight: "bold",
    fontSize: 15,
  },
});
