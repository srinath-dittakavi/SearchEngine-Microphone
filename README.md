# Enhanced Named Entity Recognition with Whisper Fine-Tuning: The Search Engine's Microphone

**Introduction**

Ever tap that mic button on your keyboard or on Google, casually dropping ethnic names or specific terms, only to have the mic play the typo game? We've all been there, that annoying detour to fix things up. Let's talk about the microphone mishaps we've all faced!

For example, If I ask the microphone the question "Who is the main character Usagi Tsukino?" It is able to get most of the sentence right. However, when it reaches the ethic name, it has difficulties and may butcher the name. This happens because the model behind the microphone was trained primarily on native languages, creating a stumbling block when faced with diverse and ethnic names.

Therefore, this project is an attempt to reduce this problem and create a model that is able to better transcribe speech. The base model that I used in the project is whisper-small (https://github.com/openai/whisper) which is a small but powerful model that is able to transcribe speech into text very impressively.

[[https://www.google.com/url?sa=i&url=https%3A%2F%2Fhuggingface.co%2Fopenai%2Fwhisper-small&psig=AOvVaw2rZOl17WQDTXm4iaSRpM0S&ust=1706264845331000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPjGooKq-IMDFQAAAAAdAAAAABAD![image](https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/c2f2a6f3-9d66-47b7-818b-e757f9dd3981)](https://www.google.com/url?sa=i&url=https%3A%2F%2Fhuggingface.co%2Fopenai%2Fwhisper-small&psig=AOvVaw2rZOl17WQDTXm4iaSRpM0S&ust=1706264845331000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPjGooKq-IMDFQAAAAAdAAAAABAD)https://www.google.com/url?sa=i&url=https%3A%2F%2Fhuggingface.co%2Fopenai%2Fwhisper-small&psig=AOvVaw2rZOl17WQDTXm4iaSRpM0S&ust=1706264845331000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPjGooKq-IMDFQAAAAAdAAAAABAD![image](https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/416cfe0d-c450-4cc8-90c7-5125eb610ef1)](https://cdn-thumbnails.huggingface.co/social-thumbnails/models/openai/whisper-small.png)https://cdn-thumbnails.huggingface.co/social-thumbnails/models/openai/whisper-small.png![image](https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/caee1a58-4c6a-43af-b5c3-54014755a788)




**Whisper-Experimentation**

This project bega
