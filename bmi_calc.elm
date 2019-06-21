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

myround n x =
    let 
        k = 10 ^ n
    in         
        toFloat (round  (k*x) ) / k

bmi model = 
    let h = 
            model.height |> make_float |> (*) 0.01  -- h in meter

        w = 
            model.weight |> make_float

     in
        w / h ^ 2 |> myround 2



calcColor model = 
    if bmi model <= 25 then
        "green"
    else
        "red"

view : Model -> Html Msg
view model =
    div []
        [ 
        h1 [] [text "BMI Calculator"]
        , input [type_ "number", step "1", value model.height, onInput Change_height] [] 
        , text " cm"
        , br [] []
        , input [type_ "number", step "0.5",value model.weight, onInput Change_weight] []
        , text " kg"
        , br [] []
        , div [style "color" (calcColor model)] [text ("BMI = " ++ (bmi model |> String.fromFloat))]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
