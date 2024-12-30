# SpeechGrade 🎤💬 Educational Platform for Speech Assessment and Question Generation  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

![Screenshot 2024-12-31 at 12 13 25 AM](https://github.com/user-attachments/assets/2dd01e0a-102f-4d19-b7c0-823189bfbf17)

`SpeechGrade` is an innovative educational platform designed to streamline speech assessment and enhance teaching methodologies through cutting-edge technologies. By integrating the MERN stack, machine learning models, large language models (LLMs), and Google's Generative AI, SpeechGrade SpeechGrade empowers educators and students with tools for automated transcription, similarity analysis, and personalized learning.

This platform enhances teaching methodologies by streamlining speech evaluations and offering dynamic test creation capabilities, making it an indispensable tool for educational institutions and training programs.

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## Features

### **1. Speech Assessment**
#### **Audio Transcription**
- Users can upload audio files through a React-based client application.
- The `Flask` server leverages `OpenAI’s Whisper` machine learning model for high-accuracy speech-to-text transcription.

#### **Similarity Analysis**
- Transcribed text is compared to a predefined target text (e.g., speeches or learning material) using `Google's Generative AI`.
- The platform calculates a similarity score and provides detailed insights into alignment with the target text.

#### **Results and Feedback**
- Performance analysis highlights areas of strength and improvement.
- Results are stored for further review, enabling continuous learning and progress tracking.

---

### **2. Question Generation and Metadata Management**
#### **Metadata Management**
- A `Node.js` server efficiently handles metadata related to teachers, students, and classes.
- Enables organized storage and retrieval of educational resources.

#### **LLM-Powered Question Generation**
- Teachers can generate test questions tailored to specific topics and objectives, including:
  - Multiple-choice questions
  - Short-answer questions
  - Essay prompts
- Questions are designed using advanced large language models, ensuring alignment with curriculum goals.

---

### 3. **Personalized Learning**
SpeechGrade incorporates data-driven insights to offer personalized feedback, enabling students to focus on specific areas for improvement. This personalization enhances the learning experience and boosts student outcomes.  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## **Technologies Used**  

### **Frontend**  
- **React.js**: Interactive and user-friendly interface for uploading audio and viewing results.  
- **Material-UI**: Modern and responsive component library for a seamless user experience.  

---

### **Backend**  
- **Flask**: Server-side processing for speech transcription and similarity analysis.  
- **Node.js**: Server for metadata management and integration with LLMs.  
- **Express.js**: Framework for efficient API management.  

---

### **Database**  
- **MongoDB**: NoSQL database for storing user profiles, performance logs, and question sets.  

---

### **Machine Learning**  
- **Whisper Model**: OpenAI’s state-of-the-art speech-to-text model for accurate transcription.  
- **Google's Generative AI**: Advanced model for text similarity assessment and educational content analysis.  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## **Installation**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/themihirmathur/SpeechGrade.git
   cd SpeechGrade
   ```

2. **Install Dependencies**  
   Install required packages for both the Flask and Node.js servers.  
   ```bash
   # Flask server
   cd server-flask
   pip install -r requirements.txt

   # Node.js server
   cd ../server-node
   npm install
   ```

3. **Run the Servers**  
   Start both servers.  
   ```bash
   # Flask server
   python app.py

   # Node.js server
   npm start
   ```

4. **Run the Client Application**  
   Navigate to the client folder and start the `React` application.  
   ```bash
   cd ../client
   npm install
   npm start
   ```

5. **Access the Application**  
   Open your browser and navigate to `http://localhost:3000`.  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## **Usage**  

### 1. **Speech Assessment**
- Navigate to the speech assessment page on the platform.  
- Upload an audio file of your speech or presentation.  
- View the transcription and similarity score along with detailed feedback.  

---

### 2. **Question Generation**
- Teachers can log in to access the question generation tool.  
- Input a topic or learning material, and the platform will generate custom test questions.  
- Save the questions for use in assessments or classroom activities.  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## **Evaluation Metrics**  
The platform employs the following metrics to assess speech similarity and system performance:  
- **Word Error Rate (WER):** Measures transcription accuracy.  
- **Semantic Similarity Score:** Quantifies alignment between the transcribed and target text.  
- **Performance Analytics:** Tracks user progress over time, providing actionable insights for improvement.  

---

## **Benefits**  
- **Educator Efficiency:** Automates transcription, assessment, and test creation.  
- **Improved Learning Outcomes:** Personalized feedback fosters targeted skill development.  
- **Scalable and Flexible:** Supports diverse use cases, from language learning to public speaking training.  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## **Future Work**  
- **Real-Time Feedback:** Implementing real-time transcription and scoring during live presentations.  
- **Multi-language Support:** Expanding the platform to support multiple languages for global accessibility.  
- **Time-Series Analysis:** Incorporating temporal patterns in speech to provide deeper insights into fluency and pacing.  
- **Enhanced Analytics:** Advanced dashboards for educators to analyze class-wide performance trends.  

![Screenshot 2024-12-31 at 12 10 18 AM](https://github.com/user-attachments/assets/cc7542cf-889a-4fc8-9c96-77d3fb9d92b5)

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>

## Contribution

Contributions to SpeechGrade are welcome. Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request.

For major changes, open an issue to discuss the proposed modifications beforehand.

---

## **Contact**
If you have any questions or feedback, feel free to reach out:  
**Name**: Mihir Mathur  
**Email**: [themihirmathur@gmail.com](mailto:themihirmathur@gmail.com)  
**Phone**: +91-7525099328  

<p align="left">
  <img src="https://www.animatedimages.org/data/media/562/animated-line-image-0184.gif" width="1920" 
</p>
