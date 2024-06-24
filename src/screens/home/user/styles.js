import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  container: {
    // position: "absolute",
    width: "100%",
    height: "100%",
  },

  listContainer: {
    marginBottom: 35,
    // backgroundColor: AppColors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: "25%",
    borderRadius: 5,
    padding: 10,
  },

  searchInput: {
    backgroundColor: AppColors.background,
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  formContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
