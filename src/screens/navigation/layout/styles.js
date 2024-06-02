import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

  content: {
    flex: 1.5,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  navigateButton: {
    padding: 20,
    backgroundColor: AppColors.background,
    borderRadius: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },

  tripInfoContainer: {
    flex: 1,
    alignItems:'center'
  },

  tripInfoHeader: {
    fontSize: 30,
  },

  tripInfoText: {
    color: "black",
    textAlign: "center",
  },
});
