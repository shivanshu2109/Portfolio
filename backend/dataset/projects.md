# Projects

## 1. CheckSmart: Cheque Image Feature Extraction System

### Background & Inspiration
I built this project after asking my dad what one thing he would like to improve in his company if AI were integrated. He said he wanted a system that could automatically update data from scanned checks. That conversation inspired me to create CheckSmart.

### Description
CheckSmart is an intelligent cheque processing system designed to automatically and accurately extract critical information from Indian handwritten cheque images. It addresses the significant challenge of reliable Optical Character Recognition (OCR) on real-world, highly variable handwritten content.

### Problem Solved
The primary problem CheckSmart solves is the inaccurate and slow manual data entry from handwritten documents, specifically bank cheques. Handwritten text is notoriously difficult for traditional OCR systems. The system aims to:

1. **Automate Feature Extraction:** Automatically locate and read key fields like Payee Name, Date, Amount in Digits, and Amount in Words
2. **Increase Accuracy:** Achieve higher extraction accuracy than general-purpose OCR, especially for complex Indian handwritten text variations
3. **Provide Structured Output:** Convert unstructured image data into usable, structured formats like CSV or JSON for downstream systems

### Tech Stack
- **Deep Learning Framework:** PyTorch, HuggingFace Transformers
- **Core Model:** TrOCR (Transformer-based OCR) - `microsoft/trocr-base-handwritten`
- **Computer Vision:** OpenCV (cv2), Pillow (PIL)
- **Data Handling:** HuggingFace datasets library, scikit-learn
- **Deployment:** Google Cloud Platform (GCP), GitHub for UI

### How I Built It

#### 1. Data Preparation and Preprocessing
- **Image Normalization:** All cheque images were resized to consistent (2400, 1100) resolution
- **Field Cropping:** Defined fixed pixel coordinates for four target fields (date, payee, amount_words, amount_digits) and cropped them from normalized images
- **"Whiteout" Masking:** For the payee field, implemented custom preprocessing to mask extraneous text by drawing white rectangles over specific areas
- **Manual Labeling:** Built a custom annotation tool using tkinter that could:
  - Resume progress from existing labels
  - Clean dataset by removing images with null values

#### 2. Field-Specific Model Training
Instead of training a single monolithic model, I adopted a strategy of training **four separate models**—one for each field. This significantly improved performance by allowing specialization.

Training process for all fields:
- **Data Split:** 80% training, 20% validation (random_state=42)
- **Training Samples:** amount_digits (2870), amount_words (2772), payee (2716), date (2745)
- **Model:** TrOCRProcessor and VisionEncoderDecoderModel from microsoft/trocr-base-handwritten
- **Augmentation:** RandomRotation(2°), ColorJitter (brightness and contrast adjustments)
- **Hyperparameters:** 10 epochs, batch size 8, learning rate 3e-5, fp16 precision, label smoothing 0.1
- **Max Length:** 16 tokens for date/amount fields, 64 tokens for payee names

#### 3. Custom Evaluation and Formatting
- Calculated exact match accuracy for each field
- For the date field, implemented custom `format_date` function to normalize predictions (ddmmyyyy → dd/mm/yyyy format)

### Challenges and Results

**Performance Analysis:**

- **Amount in Digits (Most Reliable):**
  - High training and validation accuracy
  - Consistent structure that the model successfully learned

- **Date (Moderate Performance):**
  - Training and validation showed moderate accuracy
  - Format inconsistencies in handwritten dates (slashes, dashes, abbreviations) affected performance

- **Amount in Words (Severe Overfitting):**
  - High training accuracy but poor validation accuracy
  - Large gap caused by high variability (spelling errors, phrasing variations)
  - Model memorized training data instead of generalizing

- **Payee Name (Severe Overfitting/Data Skew):**
  - Training accuracy was high but validation accuracy was very low
  - Model learned a small set of repeated names perfectly but failed on new examples

**Key Learnings:**
- Field-specific models perform better than monolithic approaches
- Handwritten text variation requires extensive, diverse training data
- Data quality and diversity are critical for generalization

### GitHub
https://github.com/shivanshu2109/CheckSmart.git

---

## 2. Cloud Configuration Translator & Validator

### Background & Inspiration
This project was built during my summer internship at Samtek, inspired by the need to streamline cloud migration efforts within an enterprise context. The goal was to create an AI-powered tool to automate the translation of cloud infrastructure configurations between major providers, which historically requires significant manual effort.

### Description
An enterprise-grade, AI-powered application that automates the translation and validation of cloud infrastructure configurations. It seamlessly converts configuration files (like YAML) between AWS, Azure, and GCP platforms. The application provides an interactive web interface for real-time processing, manual editing with syntax validation, and supports batch processing for multiple resources.

### Problem Solved
The system solves the problem of high manual effort and cost associated with multi-cloud migration:
- **Reduces manual cloud migration effort by 90%**
- **Ensures accuracy** through intelligent hybrid validation
- **Provides significant cost savings** by reducing redundant API calls through caching (up to 80% cost reduction)

### Tech Stack
- **Backend/Core:** Python 3.8+ with modular architecture
- **Frontend/UI:** Streamlit (interactive web interface)
- **AI/ML:** AWS Bedrock (LLM interface layer)
- **LLM Models:** Claude 3.5 Sonnet, LLaMA 3.1 70B, DeepSeek Coder V2, Nova Pro
- **Data/Config:** PyYAML, JSON
- **Cloud Integration:** boto3 (AWS SDK)

### Architecture
1. **Frontend (Streamlit):** User interface layer
2. **Core Engine:** Translation, Validation, and Caching logic
3. **AI Services:** LLM communication via AWS Bedrock
4. **Data Layer:** File I/O and Cache Storage

### How I Built It

#### Workflow:
1. **Selection & Input:**
   - User selects source and target cloud platforms
   - Chooses AI model
   - Uploads YAML file or uses manual editor

2. **Execution & Caching:**
   - Core Engine processes translation request
   - Intelligent Caching system (`cache_manager.py`) checks for existing translations
   - On cache miss, sends request to LLM service (`llm_handler.py`)
   - Stores translation output in cache (80% cost reduction)

3. **Validation:**
   - Hybrid Validation Engine (`validator.py`) combines:
     - AI analysis for semantic correctness
     - Rule-based checks for syntax validation
   - Reviews confidence scores

4. **Output & Finalization:**
   - Users review translated configuration
   - Manual editing capability
   - Accept AI suggestions
   - Download final configuration

### Challenges and Results

**Challenges Addressed:**
- **Cost Optimization:** Implemented intelligent caching to reduce redundant LLM API calls by 80%
- **Accuracy & Reliability:** Hybrid validation engine mixing AI analysis with rule-based checks
- **Usability:** Interactive Streamlit interface with error recovery and in-browser editing

**Key Results:**
- ✅ Reduced manual effort by 90% for cloud migration
- ✅ Reduced API costs by 80% through caching
- ✅ Delivered foundational tool for automated cloud migration during summer internship

### GitHub
https://github.com/shivanshu2109/Cloud-Service-Conveter.git

---

## 3. Multi-Modal Movie Genre Classification

### Background & Inspiration
This project is inspired by the need for deep learning systems that can classify data by leveraging more than one type of input, leading to robust and accurate predictions. It addresses a core limitation of single-source models by fusing visual features (from movie posters) and semantic embeddings (from plot summaries).

### Description
A deep learning application that classifies movie genres by creating a fusion layer that intelligently combines two distinct types of features: image features extracted from movie posters and text embeddings derived from plot summaries. Includes a Flask web interface for live predictions.

### Problem Solved
Enhances the accuracy and reliability of movie genre classification by moving beyond single-modality models:
- Improves classification when a poster alone is ambiguous or plot summary is too brief
- Uses the second modality to provide crucial context
- Automates end-to-end process from raw data to production-ready interactive interface

### Tech Stack
- **Core Frameworks:** PyTorch, Transformers
- **Visual Feature Extractor:** ConvNeXt-Tiny
- **Text Feature Extractor:** DistilBERT
- **Fusion Component:** Custom Fusion Layer
- **Deployment:** Flask (web interface)
- **ML Utilities:** Scikit-learn

### How I Built It

#### 1. Data Acquisition and Preprocessing
- Sourced data from Kaggle, IMDb, TMDb
- Custom script (`download_synopses_from_omdb.py`) to fetch plot summaries via OMDB API
- Pipeline script (`multimodal_csv_pipeline.py`) for data preprocessing and formatting

#### 2. Training Strategy (Unimodal & Multimodal)
- **Unimodal Image Model:** Trained separately using ConvNeXt-Tiny (`train_convnext-timy.py`)
- **Multimodal Fusion:** Core training handled by `train_fusion.py`/`fusion_training.py`
- Pre-trained features channeled through custom Fusion Layer

#### 3. Comprehensive Evaluation
Extensive evaluation suite:
- `eval_image.py`: Evaluates unimodal image model
- `eval_text.py`: Evaluates unimodal text model
- `eval_fusion.py`: Evaluates final multimodal system

#### 4. Deployment
- Model checkpoints saved in `models/` directory
- Flask application (`app.py`) for local deployment
- Interactive testing by uploading posters or entering plot text

### Challenges and Results

**Main Challenge:** Data accessibility and licensing restrictions—raw datasets cannot be shared directly, requiring users to collect their own from multiple sources.

**Technical Achievement:** Successfully overcame the significant challenge of fusing disparate data types (images and text) into a single predictive deep learning system.

**Result:** Fully functional, interactive system capable of multi-modal genre classification that can be run locally.

### GitHub
https://github.com/shivanshu2109/MultiModalMovieGenreClassifier.git

---

## 4. EfficientNet-B0 vs. B1 Comparison on CIFAR-100

### Background & Inspiration
The inspiration for this project was to deeply understand the performance trade-offs inherent in varying the complexity of the EfficientNet-Lite architecture. By implementing two variants entirely from scratch in PyTorch, the project provides a side-by-side comparison across key metrics.

### Description
This project implements and compares two custom variants of the EfficientNet-Lite deep learning architecture: a B0-like model (baseline) and a Mini B1 model (deeper, more complex). Both models are trained on the CIFAR-100 dataset to quantitatively and visually compare training speed, validation accuracy, and generalization over 100 epochs.

### Problem Solved
Addresses the need for clear, empirical comparison to guide neural network architecture selection:
- Identifies optimal model complexity (B0 vs. B1) for CIFAR-100 classification
- Demonstrates how architectural scaling can lead to overfitting on complex datasets
- Provides concrete evidence for architecture decision-making

### Tech Stack
- **Core Language:** Python
- **Deep Learning:** PyTorch, Torchvision
- **ML & Data Tools:** Scikit-learn, NumPy
- **Visualization:** Matplotlib, Seaborn

### How I Built It

#### Custom Implementation
Both EfficientNet variants built from scratch in PyTorch.

#### Core Components:
1. **MBConv Blocks:** Custom-built with:
   - Depthwise/pointwise convolutions
   - Squeeze-and-Excitation (SE) blocks
   - Skip connections

2. **Custom Activation:** Swish activation (x * sigmoid(x)) implemented as custom module

3. **Data Handling:** CIFAR-100 dataset automatically downloaded and preprocessed

4. **Training and Comparison:** Both models trained for 100 epochs with side-by-side visual and quantitative comparison

### Challenges and Results

**Key Finding:** The Mini B1 Model—despite being deeper and more complex—suffered from early overfitting and achieved **lower** final validation accuracy (24.14%) compared to the simpler B0-like Model (34.37%).

**Model Comparison:**

| Model | Final Val Accuracy | Best Val Accuracy | Comments |
|-------|-------------------|-------------------|----------|
| B0-like | 34.37% ✅ | Higher | Best performance, stable learning |
| Mini B1 | 24.14% ❌ | Lower | Early overfitting |

**Challenge:** The results contradicted the intuition that a deeper model would perform better. For CIFAR-100, the B0-like model generalizes better.

**Conclusion:** The B0-like model is preferred for deployment or further improvement on CIFAR-100.

### GitHub
https://github.com/shivanshu2109/EfficientNet-B0-vs-B1-Comparison.git
