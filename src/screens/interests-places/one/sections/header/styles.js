import { StyleSheet } from "react-native";
import { AppColors } from "../../../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: AppColors.primary,
    elevation: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  title: {
    color: AppColors.background,
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
