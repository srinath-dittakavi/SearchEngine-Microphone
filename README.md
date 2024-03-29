# Enhanced Named Entity Recognition with Whisper Fine-Tuning: The Search Engine's Microphone

By: Srinath Dittakavi

**Introduction**

Ever tap that mic button on your keyboard or on Google, casually dropping ethnic names or specific terms, only to have the mic play the typo game? We've all been there, that annoying detour to fix things up. Let's talk about the microphone mishaps we've all faced!

For example, If I ask the microphone the question "Who is the main character Usagi Tsukino?" It is able to get most of the sentence right. However, when it reaches the ethic name, it has difficulties and may butcher the name. This happens because the model behind the microphone was trained primarily on native languages, creating a stumbling block when faced with diverse and ethnic names.

Therefore, this project is an attempt to reduce this problem and create a model that is able to better transcribe speech. The base model that I used in the project is whisper-small (https://github.com/openai/whisper) which is a small but powerful model that is able to transcribe speech into text very impressively.

<img src="https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/3507d005-4877-44e9-8e35-b40abffb24f6" width="200" height="150">

&nbsp;

**Whisper-Experimentation**

There are various versions of the Whisper model, ranging from tiny to large. However, when crafting a speech-to-text microphone for a search engine, it's crucial to strike a balance between accuracy and speed. We need a model that not only delivers precise transcriptions but also does so swiftly to ensure a seamless user experience. Larger models excel in precision but demand more time for processing, providing a trade-off between accuracy and speed. On the flip side, smaller models, with fewer parameters, zip through transcriptions at a faster pace, albeit with a potential dip in accuracy. It's a delicate balance, and finding the sweet spot is key. Therefore, after experimenting with several models and observing the accuracy and recoridng the time, I pick the Whisper-small model due to its small size, average response rate, and accurate transcription.

<img src="https://www.assemblyai.com/blog/content/images/2022/09/Whisper-Inference-Time--CPU-.png" width="500" height="300">

&nbsp;

**Execution**

Now that we have the base model is selected, the question arises, "How can we improve the models ability to transcribe ethnic names and entities?" This is what is called Named Entity Recognition (NER) is Natural Language Processing, which involes extracting named entities like orgaizations, locations, persons or subjects.

To address this challenge, a valuable approach is to source data that includes audio clips of speakers from diverse ethnic backgrounds along with their English transcriptions. The model I developed in this repository has been fine-tuned specifically for understanding and transcribing words in **Japanese**. However, this concept can be applied to any lanaguage.

To enhance its performance on ethnic names and entities, incorporating a diverse dataset that spans various languages and accents would be beneficial. This ensures that the model learns to recognize and transcribe names accurately, regardless of the speaker's ethnicity or linguistic background.

&nbsp;

**Results**

When training the whisper model with clips from another language and english translation, the model is able to significanly produce better results when having to handle named entities.

Here is an example of the regular whisper-small model, when asked the prompt "Who is the main character Usagi Tsukino?":

<img src="https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/07ead148-10df-477e-9048-6b79ebc87f40" width="600" height="200">

As you can see, the model is great with predicting the english word however, it is having some difficulty with name "Usagi Tsukino".

Now, Here is an example of the fine-tuned whisper-small model, when asked the prompt "Who is the main character Usagi Tsukino?":

<img src="https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/6dfd0a25-7af8-4295-ba46-3101b90ce082" width="600" height="200">

Because this model is trained on the Japanese audio clips with english translation, it is producing greater results when Japanese named entites appear.

&nbsp;

**Getting Started:**

1. **Clone the Repository:**
    ```bash
    https://github.com/srinath-dittakavi/SearchEngine-Microphone.git
    ```

2. **Follow the Setup Guide:**
    Open [Start_Guide.txt](Start_Guide.txt) for step-by-step instructions on setting up and running the WebApp.


2. **Download the model:**
   Download the model from Google Drive - https://drive.google.com/drive/u/0/folders/10FFki1k_mb19qYN1YhtXG0bQCW4PUJHs
   & Place it in the Webapp/Backend folder

You should now be able to explore the model and interact with the search engine. Thank you!

&nbsp;

**Limitations:**
- Accurate Transcription of Japanese Named Entries: While the model shows improved performance in transcribing Japanese named entries, further refinement can enhance its proficiency.
  Additional training data specific to Japanese names could contribute to better accuracy.

- Challenges with Background Noise: The current model faces limitations in effectively filtering and disregarding background noises. This may lead to the inclusion of extraneous words or inaccuracies in transcription, especially in environments with high levels of ambient noise.
  
- Real-Time Processing: "Whisper is one of the recent state-of-the-art multilingual speech recognition and translation models, however, it is not designed for real time transcription" [1] Therefore the fine-tuned model's processing capabilities may be limited in real-time scenarios, particularly when faced with high volumes of audio spoken.
  [1] - https://arxiv.org/abs/2307.14743#:~:text=Whisper%20is%20one%20of%20the,designed%20for%20real%20time%20transcription.

&nbsp;

**Supporting Resources**
-  Facebookresearch/covost: CoVoST: A large-scale multilingual speech-to-Text translation corpus (CC0 licensed). (n.d.). GitHub. https://github.com/facebookresearch/covost
- Mozilla common voice. (n.d.). Common Voice. https://commonvoice.mozilla.org/en/datasets
-  Openai/whisper-small · Hugging face. (n.d.). Hugging Face – The AI community building the future. https://huggingface.co/openai/whisper-small

