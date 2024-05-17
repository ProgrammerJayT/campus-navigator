import { StyleSheet } from "react-native";
import { AppColors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginVertical: 20,
    fontSize: 20,
    textAlign: "center",
  },

  buttonContainer: {
    width: "100%",
    paddingHorizontal: "25%",
  },

  headerContainer: {
    elevation: 10,
    backgroundColor: AppColors.secondary,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
