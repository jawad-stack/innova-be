export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce",
            version: "1.0.0",
        },

        // "components":
        // {
        //     "securitySchemes":

        //     {
        //         "bearerAuth": {
        //             "type": "http",
        //             "scheme": "bearer",
        //             "bearerFormat": "JWT"
        //         }

        //     }

        // },
        servers: [
            {
                "url": 'http://localhost:5000',
                "description": "Development server"
            },
            {
                "url": "https://sleepy-plum-overalls.cyclic.app/",
                "description": "Production server"
            }
        ],
        paths: {

            "/api/user/login": {
                "get": {
                    "description": "Returns all user from the system that the user has access to",


                    "parameters": [
                        {
                            "in": "body",
                            "name": "user",
                            "description": "The user to create.",
                            "schema": {
                                "type": "object",
                                "required": [
                                    "email", "password"
                                ],
                                "properties": {
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                }
                            }
                        }
                    ],

                    "responses": {
                        "200": {
                            "description": "Login",
                            // "content": {
                            //     "application/json": {
                            //         "schema": {
                            //             "type": "array",
                            //             "items": {
                            //                 "$ref": "#/components/schemas/pet"
                            //             }
                            //         }
                            //     }
                            // }
                        }
                    }
                }
            },
            "/api/user/getAll": {
                "get": {
                    "description": "Returns all user from the system that the user has access to",
                    "responses": {
                        "200": {
                            "description": "Gives All users",
                            // "content": {
                            //     "application/json": {
                            //         "schema": {
                            //             "type": "array",
                            //             "items": {
                            //                 "$ref": "#/components/schemas/pet"
                            //             }
                            //         }
                            //     }
                            // }
                        }
                    }
                }
            },

            "/api/user/getById": {
                "security": {
                    "- bearerAuth": []
                },
                "get": {
                    "description": "Returns user based on ID",
                    "summary": "Find user by ID",
                    "operationId": "getUserById",
                    "responses": {
                        "200": {
                            "description": "pet response",
                            // "content": {
                            //     "*/*": {
                            //         "schema": {
                            //             "type": "array",
                            //             "items": {
                            //                 "$ref": "#/components/schemas/Pet"
                            //             }
                            //         }
                            //     }
                            // }
                        },
                        // "default": {
                        //     "description": "error payload",
                        //     "content": {
                        //         "text/html": {
                        //             "schema": {
                        //                 "$ref": "#/components/schemas/ErrorModel"
                        //             }
                        //         }
                        //     }
                        // }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "ID of pet to use",
                        "required": true,
                        "type": "string",
                        // "schema": {
                        //     "type": "array",
                        //     "items": {
                        //         "type": "string"
                        //     }
                        // },
                        "style": "simple"
                    }
                ]
            },

            "/api/user/create": {
                "post": {
                    "description": "Create User",
                    "summary": "Creating User",
                    "operationId": "createUser",
                    "responses": {
                        "200": {
                            "description": "pet response",
                        },
                    }
                },
                "requestBody": {
                    "content": {
                        "application/x-www-form-urlencoded": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "description": "Updated name of the pet",
                                        "type": "string"
                                    },
                                    "status": {
                                        "description": "Updated status of the pet",
                                        "type": "string"
                                    }
                                },
                                "required": ["status"]
                            }
                        }
                    }
                },
            }
        }
    },
    apis: ['./index.js'],
}