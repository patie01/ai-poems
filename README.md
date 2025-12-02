# AI Poem Generator

A beautiful web app that generates romantic poems using AI.

## Features
- Enter any topic and generate a short 4-line romantic poem
- Real-time poem generation using SheCodes AI API
- Clean, gradient UI with loading animations
- Works in any modern browser

## Setup

1. Clone the repo:
```bash
git clone https://github.com/patie01/ai-poems.git
cd ai-poems
```

2. Open `index.html` in your browser (no build needed), or run the local backend if provided.

## How It Works
- Enter a poem topic in the input field
- Click "Generate Poem"
- The app fetches a poem from the configured AI API and displays it

## Security / API keys
This repository previously contained a hard-coded SheCodes API key in `script.js`. That key
may already be present in the remote commit history. Revoke the old key in your SheCodes dashboard
and create a new one. Never commit API keys to source control.

For local testing:
- Copy `.env.example` to `.env` and set `SHECODES_API_KEY=your_key_here`.
- Prefer moving API calls to a backend endpoint that reads the key from environment
  variables and proxies requests from the frontend.

## Author
Coded by [Patience Masona](https://github.com/patie01/)

## License
Open source — see LICENSE file for details.
# AI Poem Generator

A web application that generates creative poems using OpenAI's API.

## Features

- Generate unique poems on any topic
- Built with Express.js backend and vanilla JavaScript frontend
- Uses OpenAI's GPT-4 model for poem generation
- Clean, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- OpenAI API key

## Installation

1. Clone the repository
```bash
git clone https://github.com/patie01/ai-poems.git
cd ai-poems
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file and add your OpenAI API key
```
OPENAI_API_KEY=your_api_key_here
```

## Running Locally

Start the server:
```bash
node server.js
```

Then open `http://localhost:3000` in your browser.

## Deployment

This project is hosted on Netlify.

## License

ISC
