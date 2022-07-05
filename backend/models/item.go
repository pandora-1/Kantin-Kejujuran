package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Item struct {
	Id          primitive.ObjectID `json:"id,omitempty"`
	Name        string             `json:"name,omitempty" validate:"required"`
	Image       string             `json:"image,omitempty"`
	Description string             `json:"description,omitempty" validate:"required"`
	Price       string            `json:"price,omitempty" validate:"required"`
	CreatedAt   time.Time          `json:"created_at,omitempty"`
}