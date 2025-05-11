

# 👁️ jereo

**jereo** is a lightweight CLI tool that monitors a specified folder and executes a user-defined command whenever changes are detected. It's ideal for automating tasks like rebuilding, syncing, or testing during development.

## 🚀 Features

* Real-time folder monitoring
* Custom command execution on file changes
* Simple and efficient setup

## 🛠️ Installation

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install **jereo** globally using npm:

```bash
npm install -g jereo
```

## ⚙️ Usage

Run **jereo** with the following command:

```bash
jereo <folder_path> <command>
```

* `<folder_path>`: The path to the folder you want to monitor.
* `<command>`: The command to execute when a change is detected.

### Example

To watch the `src` directory and run a build script on changes:

```bash
jereo ./src "npm run build"
```

## 📁 Project Structure

* `index.js`: Main executable script.
* `controllers/`: Contains modules responsible for handling file system events.
* `customAPI/`: Houses custom APIs used within the application.
* `package.json`: Project metadata and dependencies.


