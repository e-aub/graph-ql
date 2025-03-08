package main

import (
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		html, err := os.ReadFile("./assets/index.html")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		w.Write(html)
	})

	http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
	})
	http.ListenAndServe(":8080", nil)
}
