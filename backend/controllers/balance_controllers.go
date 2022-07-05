package controllers

import (
	"Web_Kantin_Kejujuran/backend/configs"
	"Web_Kantin_Kejujuran/backend/models"
	"Web_Kantin_Kejujuran/backend/responses"
	"context"
	"net/http"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var balanceCollection *mongo.Collection = configs.GetCollection(configs.DB, "balance")
var validateBalance = validator.New()

func CreateBalance() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var balance models.Balance
		defer cancel()

		//validate the request body
		if err := c.BindJSON(&balance); err != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validateBalance.Struct(&balance); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		newBalance := models.Balance{
			Balance: balance.Balance,
		}

		result, err := balanceCollection.InsertOne(ctx, newBalance)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusCreated, responses.UserResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}})
	}
}

func GetBalance() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("MASUK SIN")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var balance models.Balance
		defer cancel()

		err := balanceCollection.FindOne(ctx, bson.M{}).Decode(&balance)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusOK, responses.UserResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": balance}})
	}
}

func UpdateBalance() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var balance models.Balance
		defer cancel()

		var balanceUpdate models.Balance

		//validate the request body
		if err := c.BindJSON(&balanceUpdate); err != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&balanceUpdate); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}})
			return
		}

		err := balanceCollection.FindOne(ctx, bson.M{}).Decode(&balance)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		if balance.Balance+balanceUpdate.Balance < 0 {
			c.JSON(http.StatusBadRequest, responses.UserResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": "Balance is not enough"}})
			return
		}

		balance.Balance = balanceUpdate.Balance + balance.Balance

		result, err := balanceCollection.UpdateOne(
			ctx,
			bson.M{},
			bson.D{
				{"$set", bson.D{{"balance", balance.Balance}}},
			},
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.UserResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}})
			return
		}

		c.JSON(http.StatusOK, responses.UserResponse{Status: http.StatusOK, Message: "success", Data: map[string]interface{}{"data": "Balance updated", "result": result}})
	}
}
