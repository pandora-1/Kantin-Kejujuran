package controllers

import (
	"Web_Kantin_Kejujuran/backend/configs"
	"Web_Kantin_Kejujuran/backend/models"
	"html"
	"strconv"
	"strings"
	"time"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"context"
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/go-playground/validator/v10"
	"Web_Kantin_Kejujuran/backend/responses"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "user")
var validateUser = validator.New()

type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func CheckIsIDValid(arg string) (bool) {
	hasil := []rune(arg)
	if(len(hasil) != 5) {
		return false
	}
	s := []rune(arg)
	angka1 := 0
	angka := 0
	for i := 0; i < 5; i++ {
		hasil, err := strconv.Atoi(string(s[(i):(i+1)]))
		if(err != nil) {
			return false
		}
		if(i < 3) {
			angka += hasil
		} else {
			if(i == 3) {
				angka1 += hasil * 10
			} else {
				angka1 += hasil
			}
		}
	}
	return angka == angka1
}

func Register() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		
		var input RegisterInput

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password),bcrypt.DefaultCost)
		if err != nil {
			return
		}
		input.Password = string(hashedPassword)

		input.Username = html.EscapeString(strings.TrimSpace(input.Username))
		if(!CheckIsIDValid(input.Username)) {
			c.JSON(http.StatusBadRequest, gin.H{"message":"registration failed"})
		}
		count, err := userCollection.CountDocuments(context.TODO(), bson.D{})
		newUser := models.User{
			ID: count,
			Username: input.Username,
			Password: input.Password,
		}
		result, err := userCollection.InsertOne(ctx, newUser)


		if err != nil{
			fmt.Println(result)
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message":"registration success"})
	}
}

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		
		var input LoginInput

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		u := models.User{}

		u.Username = input.Username
		u.Password = input.Password
		result := models.User{}
		err := userCollection.FindOne(ctx, bson.D{{"username", u.Username}}).Decode(&result)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		err = VerifyPassword(u.Password, result.Password)

		if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		token,err := GenerateToken(result.ID)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect."})
			return
		}

		c.JSON(http.StatusOK, gin.H{"token":token})
	}
}

func VerifyPassword(password,hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}