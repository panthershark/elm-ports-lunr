module Search exposing (SearchResult, view)

{-| This is a demo of a parrot component which shows the text of an input field in the title

@docs view
@docs SearchResult

-}

import Html exposing (Html, div, h3, input, li, p, text, ul)
import Html.Events exposing (onInput)


{-| The SearchResult model
-}
type alias SearchResult =
    { title : String
    , body : String
    }


list_item : SearchResult -> Html msg
list_item { title, body } =
    li []
        [ h3 [] [ text title ]
        , p [] [ text body ]
        ]


{-| Renders the hello view
-}
view : String -> (String -> msg) -> List SearchResult -> Html msg
view q msgInput results =
    div []
        [ input [ onInput msgInput ] []
        , h3 [] [ text ("Search Results for: " ++ q) ]
        , ul [] (List.map list_item results)
        ]
