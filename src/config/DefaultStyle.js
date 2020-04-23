import Colors from "./Colors";

export default {
  formInput: {
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  formInputActive: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  formLabel: {
    paddingHorizontal: 4,
    position: "absolute",
    left: 12,
    top: 12,
    zIndex: 1000,
    backgroundColor: Colors.white,
    opacity: 0,
  },
  formButton: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 12,
    borderRadius: 50,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  formButtonText: {
    color: Colors.secondaryColor,
  },

  layoutBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.white,
  },

  layoutStyle: {
    backgroundColor: Colors.white,
    padding: 12,
    height: "100%",
    justifyContent: "center",
  },
  appLogo: {
    height: 120,
    width: 120,
    alignSelf: "center",
    marginVertical: 18,
  },

  statuBarProps: {
    barStyle: "dark-content",
    backgroundColor: Colors.white,
  },
};
