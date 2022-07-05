package routes

import (
	"Web_Kantin_Kejujuran/backend/controllers"

	"github.com/gin-gonic/gin"
)

func BalanceRoute(router *gin.Engine) {
	router.POST("/balance", controllers.CreateBalance())
	router.GET("/balance", controllers.GetBalance())
	router.PUT("/balance", controllers.UpdateBalance())
}
