package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		html, err := os.ReadFile("./assets/index.html")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Write(html)
	})

	http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if !strings.HasSuffix(path, ".js") && !strings.HasSuffix(path, ".css") && !strings.HasSuffix(path, ".png") && !strings.HasSuffix(path, ".jpg") {
			fmt.Println("not found")
			w.WriteHeader(http.StatusNotFound)
			return
		}
		dir := http.Dir("./")
		http.FileServer(dir).ServeHTTP(w, r)
	})
	log.Fatalln(http.ListenAndServe(":8080", nil))
}
