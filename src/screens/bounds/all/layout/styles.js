import { StyleSheet } from "react-native";
import { AppColors } from "../../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  content: {
    paddingHorizontal: 10,
    flex: 1,
    paddingBottom: 100,
  },

  title: {
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "bold",
  },

  addButtonContainer: {
    marginHorizontal: 10,
    paddingHorizontal: "25%",
  },
});
