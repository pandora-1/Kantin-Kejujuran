package models

type Balance struct {
	Balance float64 `json:"balance,omitempty" validate:"required"`
}
