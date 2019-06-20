module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text, h1, h2, input, br)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)


type alias Model =
    { height : String
    , weight : String}


initialModel : Model
initialModel = { height = "175", weight = "75"}


type Msg
    = Calc
    | Change_height String
    | Change_weight String

update : Msg -> Model -> Model
update msg model =
    case msg of
        Calc ->
            model

        Change_height s -> 
            { model | height = s}
 
        Change_weight s -> 
            { model | weight = s}


make_float s =
    case String.toFloat s of
        Just f -> f
        Nothing -> 0

bmiFloat h w =  w / (h / 100) ^ 2

myround n x = toFloat (round  (n*x) ) / n

bmi h w = bmiFloat (make_float h) (make_float w) |> myround 100|> String.fromFloat

calcColor model = 
    let 
        b = (bmiFloat (make_float model.height) (make_float model.weight))
    in
    if b <= 25 then "green"
    else "red"
     --if (bmiFloat (make_float model.height) (make_float model.weight)) > 30 then "red" else "green"



view : Model -> Html Msg
view model =
    div []
        [ 
        h1 [] [text "BMI Calculator"]
        , input [type_ "number", step "0.5", value model.height, onInput Change_height] [] 
        , br [] []
        , input [type_ "number", step "0.5",value model.weight, onInput Change_weight] []
        , br [] []
        , div [style "color" (calcColor model)] [text (bmi model.height model.weight)]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
