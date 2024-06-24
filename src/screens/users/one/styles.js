import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  container: {
    flex: 1,
    paddingBottom: 10,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  name: {
    fontSize: 20,
    marginTop: 10,
    color: AppColors.secondary,
    fontWeight: "bold",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    marginHorizontal: 20,
  },

  formContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
