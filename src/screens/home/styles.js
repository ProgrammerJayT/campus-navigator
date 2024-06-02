import { StyleSheet } from "react-native";
import { AppColors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },

  content: {
    flex: 1,
    paddingBottom: 50,
  },

  logo: {
    marginTop: 50,
    width: "100%",
    height: 250,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "white",
  },

  button: {
    flex: 1,
    alignItems: "center", // Center children horizontally
    backgroundColor: AppColors.primary,
    margin: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    paddingVertical: 20,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    // flex: 2,
  },

  usernameText: {
    color: AppColors.primary,
    textAlign: "center",
    padding: 20,
    fontWeight: "bold",
  },

  usernameButton: {
    borderRadius: 10,
    backgroundColor: AppColors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  userTypeText: {
    textAlign: "center",
    fontSize: 10,
    color: AppColors.background,
  },

  userTypeTextContainer: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: AppColors.primary,
  },
});
