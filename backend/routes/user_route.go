package routes

import (
	"Web_Kantin_Kejujuran/backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoute(router *gin.Engine) {
	router.POST("/register", controllers.Register())
	router.POST("/login", controllers.Login())
	router.GET("/auth", controllers.JwtAuth())
}