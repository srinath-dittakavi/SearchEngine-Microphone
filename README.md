# Enhanced Named Entity Recognition with Whisper Fine-Tuning: The Search Engine's Microphone

**Introduction**

Ever tap that mic button on your keyboard or on Google, casually dropping ethnic names or specific terms, only to have the mic play the typo game? We've all been there, that annoying detour to fix things up. Let's talk about the microphone mishaps we've all faced!

For example, If I ask the microphone the question "Who is the main character Usagi Tsukino?" It is able to get most of the sentence right. However, when it reaches the ethic name, it has difficulties and may butcher the name. This happens because the model behind the microphone was trained primarily on native languages, creating a stumbling block when faced with diverse and ethnic names.

Therefore, this project is an attempt to reduce this problem and create a model that is able to better transcribe speech. The base model that I used in the project is whisper-small (https://github.com/openai/whisper) which is a small but powerful model that is able to transcribe speech into text very impressively.

![image](https://github.com/srinath-dittakavi/SearchEngine-Microphone/assets/142838954/3507d005-4877-44e9-8e35-b40abffb24f6)


**Whisper-Experimentation**

There are various versions of the Whisper model, ranging from tiny to large. However, when crafting a speech-to-text microphone for a search engine, it's crucial to strike a balance between accuracy and speed. We need a model that not only delivers precise transcriptions but also does so swiftly to ensure a seamless user experience. Larger models excel in precision but demand more time for processing, providing a trade-off between accuracy and speed. On the flip side, smaller models, with fewer parameters, zip through transcriptions at a faster pace, albeit with a potential dip in accuracy. It's a delicate balance, and finding the sweet spot is key."

![Inference Time](https://www.assemblyai.com/blog/content/images/2022/09/Whisper-Inference-Time--CPU-.png)

