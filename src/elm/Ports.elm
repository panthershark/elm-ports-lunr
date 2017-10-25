port module Ports exposing (performSearch, searchResults)

import Search exposing (SearchResult)


port performSearch : String -> Cmd msg


port searchResults : (List SearchResult -> msg) -> Sub msg
