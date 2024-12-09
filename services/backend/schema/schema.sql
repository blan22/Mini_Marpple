Table "users" {
  "id" SERIAL [pk, increment]
  "username" VARCHAR(255) [unique, not null]
  "email" VARCHAR(255) [unique, not null]
  "password" VARCHAR(255) [not null]
  "created_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table "categories" {
  "id" SERIAL [pk, increment]
  "name" VARCHAR(50) [unique, not null]
}

Table "products" {
  "id" SERIAL [pk, increment]
  "name" VARCHAR(255) [not null]
  "category_id" INT [not null]
  "price" NUMERIC(10,2) [not null]
  "stock" INT [not null]
  "thumbnail" VARCHAR(255)
  "created_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table "carts" {
  "id" SERIAL [pk, increment]
  "user_id" INT [not null]
  "created_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table "cart_product" {
  "id" SERIAL [pk, increment]
  "cart_id" INT [not null]
  "product_id" INT [not null]
  "quantity" INT [not null]
  "created_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table "orders" {
  "id" SERIAL [pk, increment]
  "name" VARCHAR(255) [not null]
  "user_id" INT [not null]
  "total_price" NUMERIC(10,2) [not null]
  "status" VARCHAR(50) [default: 'PENDING']
  "payment_id" VARCHAR(255) [not null]
  "payment_method" VARCHAR(255)
  "created_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table "order_product" {
  "id" SERIAL [pk, increment]
  "order_id" INT [not null]
  "product_id" INT [not null]
  "quantity" INT [not null]
  "created_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Ref:"categories"."id" < "products"."category_id" [delete: set null]

Ref:"users"."id" < "carts"."user_id" [delete: cascade]

Ref:"carts"."id" < "cart_product"."cart_id" [delete: cascade]

Ref:"products"."id" < "cart_product"."product_id" [delete: cascade]

Ref:"users"."id" < "orders"."user_id" [delete: cascade]

Ref:"orders"."id" < "order_product"."order_id" [delete: cascade]

Ref:"products"."id" < "order_product"."product_id"
