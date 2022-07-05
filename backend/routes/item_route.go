package routes

import (
	"Web_Kantin_Kejujuran/backend/controllers"

	"github.com/gin-gonic/gin"
)

func ItemRoute(router *gin.Engine) {
	router.POST("/items", controllers.CreateItem())
	router.GET("/items", controllers.GetAllItems())
	router.GET("/items/sorted-by-name/ascending", controllers.GetAllItemsSortedByNameAscending())
	router.GET("/items/sorted-by-name/descending", controllers.GetAllItemsSortedByNameDescending())
	router.GET("/items/sorted-by-date/ascending", controllers.GetAllItemsSortedByDateAscending())
	router.GET("/items/sorted-by-date/descending", controllers.GetAllItemsSortedByDateDescending())
	router.DELETE("/items/:id", controllers.DeleteItem())
}
