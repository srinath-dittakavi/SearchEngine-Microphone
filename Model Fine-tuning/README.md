After fine-tuning, the model has been saved to Google Drive & Downloaded locally for the WebApp microphone.
The final model is approx 968.9 MB.

**Selection of Whisper:**
There are various versions of the Whisper model (Tiny, Small, Base, Medium, Large, Large-V2). However, for the purpose of this project,
after testing accuracy & response time of the various sizes, I choose the [whisper-small model](https://huggingface.co/openai/whisper-small).

**Fine-tuning Process:**
The whisper-model was loaded and finetuned using the The Common Voice Corpus 4 and Covost with the goal of improving the Japanese named entities.

**Dataset Utilization:**
The Common Voice Corpus 4 and Covost were chosen as valuable datasets for fine-tuning due to their diverse collection of multilingual speech data. Leveraging these datasets provided a rich source of linguistic variations and accents, contributing to the model's adaptability and effectiveness in handling real-world scenarios.

**Evaluation Metrics:**
Throughout the fine-tuning process, accuracy and response time were carefully monitored and assessed. Various sizes of the Whisper model were experimented with to strike the right balance between performance and efficiency. The selected whisper-small model demonstrated optimal results in terms of accuracy and response time, aligning with the project's requirements.

**Outcome:**
The refined whisper-small model, tailored to Japanese named entities, is now poised to contribute effectively to the project's objectives, showcasing improved performance and reliability in handling Japanese language-specific tasks.

Link to download the model:
[Google Drive Components](https://drive.google.com/drive/folders/10FFki1k_mb19qYN1YhtXG0bQCW4PUJHs?usp=sharing)
