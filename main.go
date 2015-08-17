// AltReactScaffolding project main.go
package main

import (
	"os/user"
	"path"
	"bufio"
	"fmt"
	"os"
	"strings"
	"text/template"
)

type HtmlTemplateSettings struct {
	Title string
}

type PackageTemplateSettings struct {
	AppName     string
	Description string
	Keyword     string
	Author      string
	License     string
}

func getUserInput(promptText string, defaultIfEmpty string, store *string) {
	reader := bufio.NewReader(os.Stdin)

	if defaultIfEmpty != "" {
		promptText += "(" + defaultIfEmpty + ") "
	}

	fmt.Print(promptText)

	storeTemp, _ := reader.ReadString('\n')
	storeTemp = strings.TrimSpace(storeTemp)

	if storeTemp == "" && defaultIfEmpty != "" {
		*store = defaultIfEmpty
	} else {
		*store = storeTemp
	}
}

func generateProject(htmlSettings HtmlTemplateSettings, packageSettings PackageTemplateSettings) {
	htmlTemplate, _ := Asset("client/index.html")
	packageTemplate, _ := Asset("package.json")

	htmlTempl := template.Must(template.New("").Parse(string(htmlTemplate)))
	packageTempl := template.Must(template.New("").Parse(string(packageTemplate)))

	appFolder := packageSettings.AppName

	RestoreAssets(appFolder, "")

	htmlFile, _ := os.Create(path.Join(appFolder, "client", "index.html"))
	htmlFileWriter := bufio.NewWriter(htmlFile)
	defer func() {
		htmlFileWriter.Flush()
		htmlFile.Close()
	}()

	packageFile, _ := os.Create(path.Join(appFolder, "package.json"))
	packageFileWriter := bufio.NewWriter(packageFile)
	defer func() {
		packageFileWriter.Flush()
		packageFile.Close()
	}()

	htmlTempl.Execute(htmlFileWriter, htmlSettings)
	packageTempl.Execute(packageFileWriter, packageSettings)
}

func main() {
	var appNameInput string
	var descriptionInput string
	var keywordInput string
	var authorInput string
	var licenseInput string

	getUserInput("Enter the application's name: ", "", &appNameInput)
	getUserInput("Enter a description for the application: ", "", &descriptionInput)
	getUserInput("Enter a keyword to categorize application: ", "", &keywordInput)
	getUserInput("Enter the authors's name: ", func() string { cu, _ := user.Current(); return cu.Username }() , &authorInput)
	getUserInput("Enter the application's license: ", "ISC", &licenseInput)

	htmlSettings := HtmlTemplateSettings{appNameInput}
	packageSettings := PackageTemplateSettings{strings.Replace(appNameInput, " ", "_", -1), descriptionInput, keywordInput, authorInput, licenseInput}

	generateProject(htmlSettings, packageSettings)
}
