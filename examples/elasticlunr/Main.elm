module Main exposing (..)

import Html exposing (Html, div, h1, text)
import Ports exposing (performSearch, searchResults)
import Search exposing (SearchResult)


type alias Model =
    { q : String
    , results : List SearchResult
    }


type Msg
    = SearchQuery String
    | UpdateSearchResults (List SearchResult)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SearchQuery s ->
            ( { model | q = s }, performSearch s )

        UpdateSearchResults res ->
            ( { model | results = res }, Cmd.none )


init : ( Model, Cmd Msg )
init =
    ( Model "" [], Cmd.none )


view : Model -> Html Msg
view { q, results } =
    div []
        [ h1 [] [ text "ElasticLunr.js Demo" ]
        , Search.view q SearchQuery results
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    searchResults UpdateSearchResults


main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
