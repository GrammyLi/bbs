import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/index" },
    { path: "/addTopic", component: "@/pages/CreateTopic" },
    { path: "/topic/:id", component: "@/pages/Topic" },
  ],
});
