import { StyleSheet } from "react-native";
import { AppColors } from "../../constants/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    flex: 1,
    width: "100%",
  },

  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  headingText: {
    textAlign: "center",
    fontSize: 50,
    marginTop: 20,
    color: AppColors.primary,
  },
});
