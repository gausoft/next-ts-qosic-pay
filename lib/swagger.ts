import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "QOSIC Payment API",
        version: "1.0.0",
        description: "API documentation for integrating QOSIC Pay (Togo) in Next.js",
      },
      servers: [
        {
          url: "http://localhost:3000", // Local development server
          description: "Development server",
        },
        {
          url: "https://your-production-url.com", // Add your production URL
          description: "Production server",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  });
  return spec;
};
