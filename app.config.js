import "dotenv/config";

export default {
  expo: {
    name: "Plan-It-Right",
    slug: "Plan-It-Right",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/PlanItRightLogo.png",
    splash: {
      image: "./app/assets/PlanItRightLogo.png",
      resizeMode: "contain",
      backgroundColor: "#5c6bc0",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/adaptive-icon.png",
        backgroundColor: "#5c6bc0",
      },
    },
    web: {
      favicon: "./app/assets/PlanItRightLogo.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  },
};
