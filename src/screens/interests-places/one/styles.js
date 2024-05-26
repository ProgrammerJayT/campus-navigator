import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  title: {
    color: AppColors.background,
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  headerContainer: {
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
});
