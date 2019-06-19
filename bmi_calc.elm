module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text, h1, h2, input, br)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)


type alias Model =
    { height : Float
    , weight : Float
    , bmi : Float}


initialModel : Model
initialModel = { height = 175, weight = 75, bmi=bmi 75 175}


type Msg
    = Calc
    | Change_height String
    | Change_weight String

update : Msg -> Model -> Model
update msg model =
    case msg of
        Calc ->
            { model | bmi = bmi model.weight model.height }

        Change_height s ->
            case String.toFloat s of
                    Just f -> { model | height = f}
                    Nothing -> model
       

        Change_weight s ->
            case String.toFloat s of
                    Just f -> { model | weight = f}
                    Nothing -> model
       


bmi w h =  (100 * w / ((h / 100) ^ 2) |> round |> toFloat ) / 100

view : Model -> Html Msg
view model =
    div []
        [ 
        h1 [] [text "BMI Calculator"]
        , input [value (String.fromFloat model.height), onInput Change_height] [] 
        , br [] []
        , input [value (String.fromFloat model.weight), onInput Change_weight] []
        , br [] []
        , h2 [] [text (String.fromFloat model.bmi)]
        , button [ onClick Calc ] [ text "Calculate" ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
