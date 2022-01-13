import { LazyJsonString as __LazyJsonString, SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import { MetadataBearer as $MetadataBearer } from "@aws-sdk/types";
/**
 * <p>You are not authorized to perform the action.</p>
 */
export interface AccessDeniedException extends __SmithyException, $MetadataBearer {
    name: "AccessDeniedException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace AccessDeniedException {
    const filterSensitiveLog: (obj: AccessDeniedException) => any;
}
/**
 * <p>Structure containing the estimated age range, in years, for a face.</p>
 *          <p>Amazon Rekognition estimates an age range for faces detected in the input image. Estimated age
 *       ranges can overlap. A face of a 5-year-old might have an estimated range of 4-6, while the
 *       face of a 6-year-old might have an estimated range of 4-8.</p>
 */
export interface AgeRange {
    /**
     * <p>The lowest estimated age.</p>
     */
    Low?: number;
    /**
     * <p>The highest estimated age.</p>
     */
    High?: number;
}
export declare namespace AgeRange {
    const filterSensitiveLog: (obj: AgeRange) => any;
}
/**
 * <p>Provides the S3 bucket name and object name.</p>
 *          <p>The region for the S3 bucket containing the S3 object must match the region you use for
 *       Amazon Rekognition operations.</p>
 *
 *          <p>For Amazon Rekognition to process an S3 object, the user must have permission to
 *       access the S3 object. For more information, see Resource-Based Policies in the Amazon Rekognition
 *       Developer Guide. </p>
 */
export interface S3Object {
    /**
     * <p>Name of the S3 bucket.</p>
     */
    Bucket?: string;
    /**
     * <p>S3 object key name.</p>
     */
    Name?: string;
    /**
     * <p>If the bucket is versioning enabled, you can specify the object version. </p>
     */
    Version?: string;
}
export declare namespace S3Object {
    const filterSensitiveLog: (obj: S3Object) => any;
}
/**
 * <p>The S3 bucket that contains an Amazon Sagemaker Ground Truth format manifest file.
 * </p>
 */
export interface GroundTruthManifest {
    /**
     * <p>Provides the S3 bucket name and object name.</p>
     *          <p>The region for the S3 bucket containing the S3 object must match the region you use for
     *       Amazon Rekognition operations.</p>
     *
     *          <p>For Amazon Rekognition to process an S3 object, the user must have permission to
     *       access the S3 object. For more information, see Resource-Based Policies in the Amazon Rekognition
     *       Developer Guide. </p>
     */
    S3Object?: S3Object;
}
export declare namespace GroundTruthManifest {
    const filterSensitiveLog: (obj: GroundTruthManifest) => any;
}
/**
 * <p>Assets are the images that you use to train and evaluate a model version.
 *          Assets can also contain validation information that you use to debug a failed model training.
 *          </p>
 */
export interface Asset {
    /**
     * <p>The S3 bucket that contains an Amazon Sagemaker Ground Truth format manifest file.
     * </p>
     */
    GroundTruthManifest?: GroundTruthManifest;
}
export declare namespace Asset {
    const filterSensitiveLog: (obj: Asset) => any;
}
export declare enum Attribute {
    ALL = "ALL",
    DEFAULT = "DEFAULT"
}
/**
 * <p>Metadata information about an audio stream. An array of <code>AudioMetadata</code> objects
 *       for the audio streams found in a stored video is returned by <a>GetSegmentDetection</a>. </p>
 */
export interface AudioMetadata {
    /**
     * <p>The audio codec used to encode or decode the audio stream. </p>
     */
    Codec?: string;
    /**
     * <p>The duration of the audio stream in milliseconds.</p>
     */
    DurationMillis?: number;
    /**
     * <p>The sample rate for the audio stream.</p>
     */
    SampleRate?: number;
    /**
     * <p>The number of audio channels in the segment.</p>
     */
    NumberOfChannels?: number;
}
export declare namespace AudioMetadata {
    const filterSensitiveLog: (obj: AudioMetadata) => any;
}
/**
 * <p>Indicates whether or not the face has a beard, and the confidence level in the
 *       determination.</p>
 */
export interface Beard {
    /**
     * <p>Boolean value that indicates whether the face has beard or not.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace Beard {
    const filterSensitiveLog: (obj: Beard) => any;
}
export declare enum BodyPart {
    FACE = "FACE",
    HEAD = "HEAD",
    LEFT_HAND = "LEFT_HAND",
    RIGHT_HAND = "RIGHT_HAND"
}
/**
 * <p>Identifies the bounding box around the label, face, text or personal protective equipment.
 *       The <code>left</code> (x-coordinate) and <code>top</code> (y-coordinate) are coordinates representing the top and
 *       left sides of the bounding box. Note that the upper-left corner of the image is the origin
 *       (0,0). </p>
 *          <p>The <code>top</code> and <code>left</code> values returned are ratios of the overall
 *       image size. For example, if the input image is 700x200 pixels, and the top-left coordinate of
 *       the bounding box is 350x50 pixels, the API returns a <code>left</code> value of 0.5 (350/700)
 *       and a <code>top</code> value of 0.25 (50/200).</p>
 *          <p>The <code>width</code> and <code>height</code> values represent the dimensions of the
 *       bounding box as a ratio of the overall image dimension. For example, if the input image is
 *       700x200 pixels, and the bounding box width is 70 pixels, the width returned is 0.1. </p>
 *          <note>
 *             <p> The bounding box coordinates can have negative values. For example, if Amazon Rekognition is
 *         able to detect a face that is at the image edge and is only partially visible, the service
 *         can return coordinates that are outside the image bounds and, depending on the image edge,
 *         you might get negative values or values greater than 1 for the <code>left</code> or
 *           <code>top</code> values. </p>
 *          </note>
 */
export interface BoundingBox {
    /**
     * <p>Width of the bounding box as a ratio of the overall image width.</p>
     */
    Width?: number;
    /**
     * <p>Height of the bounding box as a ratio of the overall image height.</p>
     */
    Height?: number;
    /**
     * <p>Left coordinate of the bounding box as a ratio of overall image width.</p>
     */
    Left?: number;
    /**
     * <p>Top coordinate of the bounding box as a ratio of overall image height.</p>
     */
    Top?: number;
}
export declare namespace BoundingBox {
    const filterSensitiveLog: (obj: BoundingBox) => any;
}
/**
 * <p>Information about an item of Personal Protective Equipment covering a corresponding body part. For more
 *          information, see <a>DetectProtectiveEquipment</a>.</p>
 */
export interface CoversBodyPart {
    /**
     * <p>The confidence that Amazon Rekognition has in the value of <code>Value</code>.</p>
     */
    Confidence?: number;
    /**
     * <p>True if the PPE covers the corresponding body part, otherwise false.</p>
     */
    Value?: boolean;
}
export declare namespace CoversBodyPart {
    const filterSensitiveLog: (obj: CoversBodyPart) => any;
}
export declare enum ProtectiveEquipmentType {
    FACE_COVER = "FACE_COVER",
    HAND_COVER = "HAND_COVER",
    HEAD_COVER = "HEAD_COVER"
}
/**
 * <p>Information about an item of Personal Protective Equipment (PPE) detected by
 *          <a>DetectProtectiveEquipment</a>. For more
 *          information, see <a>DetectProtectiveEquipment</a>.</p>
 */
export interface EquipmentDetection {
    /**
     * <p>A bounding box surrounding the item of detected PPE.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>The confidence that Amazon Rekognition has that the bounding box (<code>BoundingBox</code>) contains an item of PPE.</p>
     */
    Confidence?: number;
    /**
     * <p>The type of detected PPE.</p>
     */
    Type?: ProtectiveEquipmentType | string;
    /**
     * <p>Information about the body part covered by the detected PPE.</p>
     */
    CoversBodyPart?: CoversBodyPart;
}
export declare namespace EquipmentDetection {
    const filterSensitiveLog: (obj: EquipmentDetection) => any;
}
/**
 * <p>Information about a body part detected by <a>DetectProtectiveEquipment</a> that contains PPE.
 *          An array of <code>ProtectiveEquipmentBodyPart</code> objects is returned for each person detected by
 *          <code>DetectProtectiveEquipment</code>. </p>
 */
export interface ProtectiveEquipmentBodyPart {
    /**
     * <p>The detected body part.</p>
     */
    Name?: BodyPart | string;
    /**
     * <p>The confidence that Amazon Rekognition has in the detection accuracy of the detected body part.
     *       </p>
     */
    Confidence?: number;
    /**
     * <p>An array of Personal Protective Equipment items detected around a body part.</p>
     */
    EquipmentDetections?: EquipmentDetection[];
}
export declare namespace ProtectiveEquipmentBodyPart {
    const filterSensitiveLog: (obj: ProtectiveEquipmentBodyPart) => any;
}
export declare enum LandmarkType {
    chinBottom = "chinBottom",
    eyeLeft = "eyeLeft",
    eyeRight = "eyeRight",
    leftEyeBrowLeft = "leftEyeBrowLeft",
    leftEyeBrowRight = "leftEyeBrowRight",
    leftEyeBrowUp = "leftEyeBrowUp",
    leftEyeDown = "leftEyeDown",
    leftEyeLeft = "leftEyeLeft",
    leftEyeRight = "leftEyeRight",
    leftEyeUp = "leftEyeUp",
    leftPupil = "leftPupil",
    midJawlineLeft = "midJawlineLeft",
    midJawlineRight = "midJawlineRight",
    mouthDown = "mouthDown",
    mouthLeft = "mouthLeft",
    mouthRight = "mouthRight",
    mouthUp = "mouthUp",
    nose = "nose",
    noseLeft = "noseLeft",
    noseRight = "noseRight",
    rightEyeBrowLeft = "rightEyeBrowLeft",
    rightEyeBrowRight = "rightEyeBrowRight",
    rightEyeBrowUp = "rightEyeBrowUp",
    rightEyeDown = "rightEyeDown",
    rightEyeLeft = "rightEyeLeft",
    rightEyeRight = "rightEyeRight",
    rightEyeUp = "rightEyeUp",
    rightPupil = "rightPupil",
    upperJawlineLeft = "upperJawlineLeft",
    upperJawlineRight = "upperJawlineRight"
}
/**
 * <p>Indicates the location of the landmark on the face.</p>
 */
export interface Landmark {
    /**
     * <p>Type of landmark.</p>
     */
    Type?: LandmarkType | string;
    /**
     * <p>The x-coordinate of the landmark expressed as a ratio of the width of the image.
     *       The x-coordinate is measured from the left-side of the image.
     *       For example, if the image is 700 pixels wide and the x-coordinate of the landmark is at 350 pixels, this value is 0.5. </p>
     */
    X?: number;
    /**
     * <p>The y-coordinate of the landmark expressed as a ratio of the height of the image.
     *       The y-coordinate is measured from the top of the image.
     *       For example, if the image height is 200 pixels and the y-coordinate of the landmark is at 50 pixels, this value is 0.25.</p>
     */
    Y?: number;
}
export declare namespace Landmark {
    const filterSensitiveLog: (obj: Landmark) => any;
}
/**
 * <p>Indicates the pose of the face as determined by its pitch, roll, and yaw.</p>
 */
export interface Pose {
    /**
     * <p>Value representing the face rotation on the roll axis.</p>
     */
    Roll?: number;
    /**
     * <p>Value representing the face rotation on the yaw axis.</p>
     */
    Yaw?: number;
    /**
     * <p>Value representing the face rotation on the pitch axis.</p>
     */
    Pitch?: number;
}
export declare namespace Pose {
    const filterSensitiveLog: (obj: Pose) => any;
}
/**
 * <p>Identifies face image brightness and sharpness. </p>
 */
export interface ImageQuality {
    /**
     * <p>Value representing brightness of the face. The service returns a value between 0 and
     *       100 (inclusive). A higher value indicates a brighter face image.</p>
     */
    Brightness?: number;
    /**
     * <p>Value representing sharpness of the face. The service returns a value between 0 and 100
     *       (inclusive). A higher value indicates a sharper face image.</p>
     */
    Sharpness?: number;
}
export declare namespace ImageQuality {
    const filterSensitiveLog: (obj: ImageQuality) => any;
}
/**
 * <p>Provides face metadata for target image faces that are analyzed by
 *         <code>CompareFaces</code> and <code>RecognizeCelebrities</code>.</p>
 */
export interface ComparedFace {
    /**
     * <p>Bounding box of the face.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>Level of confidence that what the bounding box contains is a face.</p>
     */
    Confidence?: number;
    /**
     * <p>An array of facial landmarks.</p>
     */
    Landmarks?: Landmark[];
    /**
     * <p>Indicates the pose of the face as determined by its pitch, roll, and yaw.</p>
     */
    Pose?: Pose;
    /**
     * <p>Identifies face image brightness and sharpness. </p>
     */
    Quality?: ImageQuality;
}
export declare namespace ComparedFace {
    const filterSensitiveLog: (obj: ComparedFace) => any;
}
/**
 * <p>Provides information about a celebrity recognized by the <a>RecognizeCelebrities</a> operation.</p>
 */
export interface Celebrity {
    /**
     * <p>An array of URLs pointing to additional information about the celebrity. If there is no
     *       additional information about the celebrity, this list is empty.</p>
     */
    Urls?: string[];
    /**
     * <p>The name of the celebrity.</p>
     */
    Name?: string;
    /**
     * <p>A unique identifier for the celebrity. </p>
     */
    Id?: string;
    /**
     * <p>Provides information about the celebrity's face, such as its location on the
     *       image.</p>
     */
    Face?: ComparedFace;
    /**
     * <p>The confidence, in percentage, that Amazon Rekognition has that the recognized face is the
     *       celebrity.</p>
     */
    MatchConfidence?: number;
}
export declare namespace Celebrity {
    const filterSensitiveLog: (obj: Celebrity) => any;
}
export declare type EmotionName = "ANGRY" | "CALM" | "CONFUSED" | "DISGUSTED" | "FEAR" | "HAPPY" | "SAD" | "SURPRISED" | "UNKNOWN";
/**
 * <p>The emotions that appear to be expressed on the face, and the confidence level in the determination.
 *       The API is only making a determination of the physical appearance of a person's face. It is not a determination
 *       of the person’s internal emotional state and should not be used in such a way. For example, a person pretending to have
 *       a sad face might not be sad emotionally.</p>
 */
export interface Emotion {
    /**
     * <p>Type of emotion detected.</p>
     */
    Type?: EmotionName | string;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace Emotion {
    const filterSensitiveLog: (obj: Emotion) => any;
}
/**
 * <p>Indicates whether or not the face is wearing eye glasses, and the confidence level in
 *       the determination.</p>
 */
export interface Eyeglasses {
    /**
     * <p>Boolean value that indicates whether the face is wearing eye glasses or not.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace Eyeglasses {
    const filterSensitiveLog: (obj: Eyeglasses) => any;
}
/**
 * <p>Indicates whether or not the eyes on the face are open, and the confidence level in the
 *       determination.</p>
 */
export interface EyeOpen {
    /**
     * <p>Boolean value that indicates whether the eyes on the face are open.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace EyeOpen {
    const filterSensitiveLog: (obj: EyeOpen) => any;
}
export declare enum GenderType {
    Female = "Female",
    Male = "Male"
}
/**
 * <p>The predicted gender of a detected face.
 *           </p>
 *
 *
 *          <p>Amazon Rekognition makes gender binary (male/female) predictions based on the physical appearance
 *       of a face in a particular image. This kind of prediction is not designed to categorize a person’s gender
 *       identity, and you shouldn't use Amazon Rekognition to make such a determination. For example, a male actor
 *       wearing a long-haired wig and earrings for a role might be predicted as female.</p>
 *
 *          <p>Using Amazon Rekognition to make gender binary predictions is best suited for use cases where aggregate gender distribution statistics need to be
 *       analyzed without identifying specific users. For example, the percentage of female users compared to male users on a social media platform. </p>
 *
 *          <p>We don't recommend using gender binary predictions to make decisions that impact
 an individual's rights, privacy, or access to services.</p>
 */
export interface Gender {
    /**
     * <p>The predicted gender of the face.</p>
     */
    Value?: GenderType | string;
    /**
     * <p>Level of confidence in the prediction.</p>
     */
    Confidence?: number;
}
export declare namespace Gender {
    const filterSensitiveLog: (obj: Gender) => any;
}
/**
 * <p>Indicates whether or not the mouth on the face is open, and the confidence level in the
 *       determination.</p>
 */
export interface MouthOpen {
    /**
     * <p>Boolean value that indicates whether the mouth on the face is open or not.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace MouthOpen {
    const filterSensitiveLog: (obj: MouthOpen) => any;
}
/**
 * <p>Indicates whether or not the face has a mustache, and the confidence level in the
 *       determination.</p>
 */
export interface Mustache {
    /**
     * <p>Boolean value that indicates whether the face has mustache or not.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace Mustache {
    const filterSensitiveLog: (obj: Mustache) => any;
}
/**
 * <p>Indicates whether or not the face is smiling, and the confidence level in the
 *       determination.</p>
 */
export interface Smile {
    /**
     * <p>Boolean value that indicates whether the face is smiling or not.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace Smile {
    const filterSensitiveLog: (obj: Smile) => any;
}
/**
 * <p>Indicates whether or not the face is wearing sunglasses, and the confidence level in
 *       the determination.</p>
 */
export interface Sunglasses {
    /**
     * <p>Boolean value that indicates whether the face is wearing sunglasses or not.</p>
     */
    Value?: boolean;
    /**
     * <p>Level of confidence in the determination.</p>
     */
    Confidence?: number;
}
export declare namespace Sunglasses {
    const filterSensitiveLog: (obj: Sunglasses) => any;
}
/**
 * <p>Structure containing attributes of the face that the algorithm detected.</p>
 *          <p>A <code>FaceDetail</code> object contains either the default facial attributes or all facial attributes.
 *       The default attributes are <code>BoundingBox</code>, <code>Confidence</code>, <code>Landmarks</code>, <code>Pose</code>, and <code>Quality</code>.</p>
 *          <p>
 *             <a>GetFaceDetection</a> is the only Amazon Rekognition Video stored video operation that can return a <code>FaceDetail</code> object with all attributes.
 *       To specify which attributes to return, use the <code>FaceAttributes</code> input parameter for <a>StartFaceDetection</a>.
 *       The following Amazon Rekognition Video operations return only the default attributes. The corresponding Start operations
 *         don't have a <code>FaceAttributes</code> input parameter.</p>
 *          <ul>
 *             <li>
 *                <p>GetCelebrityRecognition</p>
 *             </li>
 *             <li>
 *                <p>GetPersonTracking</p>
 *             </li>
 *             <li>
 *                <p>GetFaceSearch</p>
 *             </li>
 *          </ul>
 *          <p>The Amazon Rekognition Image <a>DetectFaces</a> and <a>IndexFaces</a> operations
 *       can return all facial attributes. To specify which attributes to return, use the
 *       <code>Attributes</code> input parameter for <code>DetectFaces</code>. For <code>IndexFaces</code>, use the
 *       <code>DetectAttributes</code> input parameter.</p>
 */
export interface FaceDetail {
    /**
     * <p>Bounding box of the face. Default attribute.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>The estimated age range, in years, for the face. Low represents the lowest estimated
     *       age and High represents the highest estimated age.</p>
     */
    AgeRange?: AgeRange;
    /**
     * <p>Indicates whether or not the face is smiling, and the confidence level in the
     *       determination.</p>
     */
    Smile?: Smile;
    /**
     * <p>Indicates whether or not the face is wearing eye glasses, and the confidence level in
     *       the determination.</p>
     */
    Eyeglasses?: Eyeglasses;
    /**
     * <p>Indicates whether or not the face is wearing sunglasses, and the confidence level in
     *       the determination.</p>
     */
    Sunglasses?: Sunglasses;
    /**
     * <p>The predicted gender of a detected face.
     *     </p>
     */
    Gender?: Gender;
    /**
     * <p>Indicates whether or not the face has a beard, and the confidence level in the
     *       determination.</p>
     */
    Beard?: Beard;
    /**
     * <p>Indicates whether or not the face has a mustache, and the confidence level in the
     *       determination.</p>
     */
    Mustache?: Mustache;
    /**
     * <p>Indicates whether or not the eyes on the face are open, and the confidence level in the
     *       determination.</p>
     */
    EyesOpen?: EyeOpen;
    /**
     * <p>Indicates whether or not the mouth on the face is open, and the confidence level in the
     *       determination.</p>
     */
    MouthOpen?: MouthOpen;
    /**
     * <p>The emotions that appear to be expressed on the face, and the confidence level in the determination.
     *       The API is only making a determination of the physical appearance of a person's face. It is not a determination
     *       of the person’s internal emotional state and should not be used in such a way. For example, a person pretending to have
     *       a sad face might not be sad emotionally.</p>
     */
    Emotions?: Emotion[];
    /**
     * <p>Indicates the location of landmarks on the face. Default attribute.</p>
     */
    Landmarks?: Landmark[];
    /**
     * <p>Indicates the pose of the face as determined by its pitch, roll, and yaw. Default attribute.</p>
     */
    Pose?: Pose;
    /**
     * <p>Identifies image brightness and sharpness. Default attribute.</p>
     */
    Quality?: ImageQuality;
    /**
     * <p>Confidence level that the bounding box contains a face (and not a different object such
     *       as a tree). Default attribute.</p>
     */
    Confidence?: number;
}
export declare namespace FaceDetail {
    const filterSensitiveLog: (obj: FaceDetail) => any;
}
/**
 * <p>Information about a recognized celebrity.</p>
 */
export interface CelebrityDetail {
    /**
     * <p>An array of URLs pointing to additional celebrity information. </p>
     */
    Urls?: string[];
    /**
     * <p>The name of the celebrity.</p>
     */
    Name?: string;
    /**
     * <p>The unique identifier for the celebrity. </p>
     */
    Id?: string;
    /**
     * <p>The confidence, in percentage, that Amazon Rekognition has that the recognized face is the celebrity. </p>
     */
    Confidence?: number;
    /**
     * <p>Bounding box around the body of a celebrity.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>Face details for the recognized celebrity.</p>
     */
    Face?: FaceDetail;
}
export declare namespace CelebrityDetail {
    const filterSensitiveLog: (obj: CelebrityDetail) => any;
}
/**
 * <p>Information about a detected celebrity and the time the celebrity was detected in a stored video.
 *         For more information, see GetCelebrityRecognition in the Amazon Rekognition Developer Guide.</p>
 */
export interface CelebrityRecognition {
    /**
     * <p>The time, in milliseconds from the start of the video, that the celebrity was recognized.</p>
     */
    Timestamp?: number;
    /**
     * <p>Information about a recognized celebrity.</p>
     */
    Celebrity?: CelebrityDetail;
}
export declare namespace CelebrityRecognition {
    const filterSensitiveLog: (obj: CelebrityRecognition) => any;
}
export declare enum CelebrityRecognitionSortBy {
    ID = "ID",
    TIMESTAMP = "TIMESTAMP"
}
/**
 * <p>Type that describes the face Amazon Rekognition chose to compare with the faces in the target.
 *       This contains a bounding box for the selected face and confidence level that the bounding box
 *       contains a face. Note that Amazon Rekognition selects the largest face in the source image for this
 *       comparison. </p>
 */
export interface ComparedSourceImageFace {
    /**
     * <p>Bounding box of the face.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>Confidence level that the selected bounding box contains a face.</p>
     */
    Confidence?: number;
}
export declare namespace ComparedSourceImageFace {
    const filterSensitiveLog: (obj: ComparedSourceImageFace) => any;
}
export declare enum QualityFilter {
    AUTO = "AUTO",
    HIGH = "HIGH",
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    NONE = "NONE"
}
/**
 * <p>Provides the input image either as bytes or an S3 object.</p>
 *          <p>You pass image bytes to an Amazon Rekognition API operation by using the <code>Bytes</code>
 *       property. For example, you would use the <code>Bytes</code> property to pass an image loaded
 *       from a local file system. Image bytes passed by using the <code>Bytes</code> property must be
 *       base64-encoded. Your code may not need to encode image bytes if you are using an AWS SDK to
 *       call Amazon Rekognition API operations. </p>
 *
 *          <p>For more information, see Analyzing an Image Loaded from a Local File System
 *       in the Amazon Rekognition Developer Guide.</p>
 *          <p> You pass images stored in an S3 bucket to an Amazon Rekognition API operation by using the
 *         <code>S3Object</code> property. Images stored in an S3 bucket do not need to be
 *       base64-encoded.</p>
 *          <p>The region for the S3 bucket containing the S3 object must match the region you use for
 *       Amazon Rekognition operations.</p>
 *          <p>If you use the
 *       AWS
 *       CLI to call Amazon Rekognition operations, passing image bytes using the Bytes
 *       property is not supported. You must first upload the image to an Amazon S3 bucket and then
 *       call the operation using the S3Object property.</p>
 *
 *          <p>For Amazon Rekognition to process an S3 object, the user must have permission to access the S3
 *       object. For more information, see Resource Based Policies in the Amazon Rekognition Developer Guide.
 *     </p>
 */
export interface Image {
    /**
     * <p>Blob of image bytes up to 5 MBs.</p>
     */
    Bytes?: Uint8Array;
    /**
     * <p>Identifies an S3 object as the image source.</p>
     */
    S3Object?: S3Object;
}
export declare namespace Image {
    const filterSensitiveLog: (obj: Image) => any;
}
export interface CompareFacesRequest {
    /**
     * <p>The input image as base64-encoded bytes or an S3 object.
     *       If you use the AWS CLI to call Amazon Rekognition operations,
     *       passing base64-encoded image bytes is not supported. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    SourceImage: Image | undefined;
    /**
     * <p>The target image as base64-encoded bytes or an S3 object. If you use the AWS CLI to
     *       call Amazon Rekognition operations, passing base64-encoded image bytes is not supported.
     *     </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    TargetImage: Image | undefined;
    /**
     * <p>The minimum level of confidence in the face matches that a match must meet to be
     *       included in the <code>FaceMatches</code> array.</p>
     */
    SimilarityThreshold?: number;
    /**
     * <p>A filter that specifies a quality bar for how much filtering is done to identify faces.
     *       Filtered faces aren't compared. If you specify <code>AUTO</code>, Amazon Rekognition chooses the quality bar.
     *       If you specify <code>LOW</code>,
     *       <code>MEDIUM</code>, or <code>HIGH</code>, filtering removes all faces that
     *       don’t meet the chosen quality bar.
     *
     *       The quality bar is based on a variety of common use cases. Low-quality
     *       detections can occur for a number of reasons. Some examples are an object that's misidentified
     *       as a face, a face that's too blurry, or a face with a
     *       pose that's too extreme to use. If you specify <code>NONE</code>, no
     *       filtering is performed. The default value is <code>NONE</code>.
     *     </p>
     *          <p>To use quality filtering, the collection you are using must be associated with version 3 of the face model or higher.</p>
     */
    QualityFilter?: QualityFilter | string;
}
export declare namespace CompareFacesRequest {
    const filterSensitiveLog: (obj: CompareFacesRequest) => any;
}
/**
 * <p>Provides information about a face in a target image that matches the source image face
 *       analyzed by <code>CompareFaces</code>. The <code>Face</code> property contains the bounding
 *       box of the face in the target image. The <code>Similarity</code> property is the confidence
 *       that the source image face matches the face in the bounding box.</p>
 */
export interface CompareFacesMatch {
    /**
     * <p>Level of confidence that the faces match.</p>
     */
    Similarity?: number;
    /**
     * <p>Provides face metadata (bounding box and confidence that the bounding box actually
     *       contains a face).</p>
     */
    Face?: ComparedFace;
}
export declare namespace CompareFacesMatch {
    const filterSensitiveLog: (obj: CompareFacesMatch) => any;
}
export declare enum OrientationCorrection {
    ROTATE_0 = "ROTATE_0",
    ROTATE_180 = "ROTATE_180",
    ROTATE_270 = "ROTATE_270",
    ROTATE_90 = "ROTATE_90"
}
export interface CompareFacesResponse {
    /**
     * <p>The face in the source image that was used for comparison.</p>
     */
    SourceImageFace?: ComparedSourceImageFace;
    /**
     * <p>An array of faces in the target image that match the source image face. Each
     *         <code>CompareFacesMatch</code> object provides the bounding box, the confidence level that
     *       the bounding box contains a face, and the similarity score for the face in the bounding box
     *       and the face in the source image.</p>
     */
    FaceMatches?: CompareFacesMatch[];
    /**
     * <p>An array of faces in the target image that did not match the source image
     *       face.</p>
     */
    UnmatchedFaces?: ComparedFace[];
    /**
     * <p>The value of <code>SourceImageOrientationCorrection</code> is always null.</p>
     *          <p>If the input image is in .jpeg format, it might contain exchangeable image file format (Exif) metadata
     *       that includes the image's orientation. Amazon Rekognition uses this orientation information to perform
     *       image correction. The bounding box coordinates are translated to represent object locations
     *       after the orientation information in the Exif metadata is used to correct the image orientation.
     *       Images in .png format don't contain Exif metadata.</p>
     *          <p>Amazon Rekognition doesn’t perform image correction for images in .png format and
     *       .jpeg images without orientation information in the image Exif metadata. The bounding box
     *       coordinates aren't translated and represent the object locations before the image is rotated.
     *     </p>
     */
    SourceImageOrientationCorrection?: OrientationCorrection | string;
    /**
     * <p>The value of <code>TargetImageOrientationCorrection</code> is always null.</p>
     *          <p>If the input image is in .jpeg format, it might contain exchangeable image file format (Exif) metadata
     *       that includes the image's orientation. Amazon Rekognition uses this orientation information to perform
     *       image correction. The bounding box coordinates are translated to represent object locations
     *       after the orientation information in the Exif metadata is used to correct the image orientation.
     *       Images in .png format don't contain Exif metadata.</p>
     *          <p>Amazon Rekognition doesn’t perform image correction for images in .png format and
     *       .jpeg images without orientation information in the image Exif metadata. The bounding box
     *       coordinates aren't translated and represent the object locations before the image is rotated.
     *     </p>
     */
    TargetImageOrientationCorrection?: OrientationCorrection | string;
}
export declare namespace CompareFacesResponse {
    const filterSensitiveLog: (obj: CompareFacesResponse) => any;
}
/**
 * <p>The input image size exceeds the allowed limit. For more information, see
 *       Limits in Amazon Rekognition in the Amazon Rekognition Developer Guide. </p>
 */
export interface ImageTooLargeException extends __SmithyException, $MetadataBearer {
    name: "ImageTooLargeException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ImageTooLargeException {
    const filterSensitiveLog: (obj: ImageTooLargeException) => any;
}
/**
 * <p>Amazon Rekognition experienced a service issue. Try your call again.</p>
 */
export interface InternalServerError extends __SmithyException, $MetadataBearer {
    name: "InternalServerError";
    $fault: "server";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace InternalServerError {
    const filterSensitiveLog: (obj: InternalServerError) => any;
}
/**
 * <p>The provided image format is not supported. </p>
 */
export interface InvalidImageFormatException extends __SmithyException, $MetadataBearer {
    name: "InvalidImageFormatException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace InvalidImageFormatException {
    const filterSensitiveLog: (obj: InvalidImageFormatException) => any;
}
/**
 * <p>Input parameter violated a constraint. Validate your parameter before calling the API
 *       operation again.</p>
 */
export interface InvalidParameterException extends __SmithyException, $MetadataBearer {
    name: "InvalidParameterException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace InvalidParameterException {
    const filterSensitiveLog: (obj: InvalidParameterException) => any;
}
/**
 * <p>Amazon Rekognition is unable to access the S3 object specified in the request.</p>
 */
export interface InvalidS3ObjectException extends __SmithyException, $MetadataBearer {
    name: "InvalidS3ObjectException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace InvalidS3ObjectException {
    const filterSensitiveLog: (obj: InvalidS3ObjectException) => any;
}
/**
 * <p>The number of requests exceeded your throughput limit. If you want to increase this
 *       limit, contact Amazon Rekognition.</p>
 */
export interface ProvisionedThroughputExceededException extends __SmithyException, $MetadataBearer {
    name: "ProvisionedThroughputExceededException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ProvisionedThroughputExceededException {
    const filterSensitiveLog: (obj: ProvisionedThroughputExceededException) => any;
}
/**
 * <p>Amazon Rekognition is temporarily unable to process the request. Try your call again.</p>
 */
export interface ThrottlingException extends __SmithyException, $MetadataBearer {
    name: "ThrottlingException";
    $fault: "server";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ThrottlingException {
    const filterSensitiveLog: (obj: ThrottlingException) => any;
}
export declare enum ContentClassifier {
    FREE_OF_ADULT_CONTENT = "FreeOfAdultContent",
    FREE_OF_PERSONALLY_IDENTIFIABLE_INFORMATION = "FreeOfPersonallyIdentifiableInformation"
}
/**
 * <p>Provides information about a single type of unsafe content found in an image or video. Each type of
 *       moderated content has a label within a hierarchical taxonomy. For more information, see
 *       Detecting Unsafe Content in the Amazon Rekognition Developer Guide.</p>
 */
export interface ModerationLabel {
    /**
     * <p>Specifies the confidence that Amazon Rekognition has that the label has been correctly
     *       identified.</p>
     *          <p>If you don't specify the <code>MinConfidence</code> parameter in the call to
     *         <code>DetectModerationLabels</code>, the operation returns labels with a confidence value
     *       greater than or equal to 50 percent.</p>
     */
    Confidence?: number;
    /**
     * <p>The label name for the type of unsafe content detected in the image.</p>
     */
    Name?: string;
    /**
     * <p>The name for the parent label. Labels at the top level of the hierarchy have the parent
     *       label <code>""</code>.</p>
     */
    ParentName?: string;
}
export declare namespace ModerationLabel {
    const filterSensitiveLog: (obj: ModerationLabel) => any;
}
/**
 * <p>Information about an unsafe content label detection in a stored video.</p>
 */
export interface ContentModerationDetection {
    /**
     * <p>Time, in milliseconds from the beginning of the video, that the unsafe content label was detected.</p>
     */
    Timestamp?: number;
    /**
     * <p>The unsafe content label detected by in the stored video.</p>
     */
    ModerationLabel?: ModerationLabel;
}
export declare namespace ContentModerationDetection {
    const filterSensitiveLog: (obj: ContentModerationDetection) => any;
}
export declare enum ContentModerationSortBy {
    NAME = "NAME",
    TIMESTAMP = "TIMESTAMP"
}
export interface CreateCollectionRequest {
    /**
     * <p>ID for the collection that you are creating.</p>
     */
    CollectionId: string | undefined;
}
export declare namespace CreateCollectionRequest {
    const filterSensitiveLog: (obj: CreateCollectionRequest) => any;
}
export interface CreateCollectionResponse {
    /**
     * <p>HTTP status code indicating the result of the operation.</p>
     */
    StatusCode?: number;
    /**
     * <p>Amazon Resource Name (ARN) of the collection. You can use this to manage permissions on
     *       your resources. </p>
     */
    CollectionArn?: string;
    /**
     * <p>Version number of the face detection model associated with the collection you are creating.</p>
     */
    FaceModelVersion?: string;
}
export declare namespace CreateCollectionResponse {
    const filterSensitiveLog: (obj: CreateCollectionResponse) => any;
}
/**
 * <p>A collection with the specified ID already exists.</p>
 */
export interface ResourceAlreadyExistsException extends __SmithyException, $MetadataBearer {
    name: "ResourceAlreadyExistsException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ResourceAlreadyExistsException {
    const filterSensitiveLog: (obj: ResourceAlreadyExistsException) => any;
}
export interface CreateProjectRequest {
    /**
     * <p>The name of the project to create.</p>
     */
    ProjectName: string | undefined;
}
export declare namespace CreateProjectRequest {
    const filterSensitiveLog: (obj: CreateProjectRequest) => any;
}
export interface CreateProjectResponse {
    /**
     * <p>The Amazon Resource Name (ARN) of the new project. You can use the ARN to
     *       configure IAM access to the project. </p>
     */
    ProjectArn?: string;
}
export declare namespace CreateProjectResponse {
    const filterSensitiveLog: (obj: CreateProjectResponse) => any;
}
/**
 * <p>An Amazon Rekognition service limit was exceeded. For example, if you start too many Amazon Rekognition Video jobs concurrently, calls to start operations
 *             (<code>StartLabelDetection</code>, for example) will raise a <code>LimitExceededException</code> exception (HTTP status code: 400) until
 *             the number of concurrently running jobs is below the Amazon Rekognition service limit.  </p>
 */
export interface LimitExceededException extends __SmithyException, $MetadataBearer {
    name: "LimitExceededException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace LimitExceededException {
    const filterSensitiveLog: (obj: LimitExceededException) => any;
}
/**
 * <p>The specified resource is already being used.</p>
 */
export interface ResourceInUseException extends __SmithyException, $MetadataBearer {
    name: "ResourceInUseException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ResourceInUseException {
    const filterSensitiveLog: (obj: ResourceInUseException) => any;
}
/**
 * <p>The S3 bucket and folder location where training output is placed.</p>
 */
export interface OutputConfig {
    /**
     * <p>The S3 bucket where training output is placed.</p>
     */
    S3Bucket?: string;
    /**
     * <p>The prefix applied to the training output files. </p>
     */
    S3KeyPrefix?: string;
}
export declare namespace OutputConfig {
    const filterSensitiveLog: (obj: OutputConfig) => any;
}
/**
 * <p>The dataset used for testing. Optionally, if <code>AutoCreate</code> is set,  Amazon Rekognition Custom Labels creates a
 *          testing dataset using an 80/20 split of the training dataset.</p>
 */
export interface TestingData {
    /**
     * <p>The assets used for testing.</p>
     */
    Assets?: Asset[];
    /**
     * <p>If specified, Amazon Rekognition Custom Labels creates a testing dataset with an 80/20 split of the training dataset.</p>
     */
    AutoCreate?: boolean;
}
export declare namespace TestingData {
    const filterSensitiveLog: (obj: TestingData) => any;
}
/**
 * <p>The dataset used for training.</p>
 */
export interface TrainingData {
    /**
     * <p>A Sagemaker GroundTruth manifest file that contains the training images (assets).</p>
     */
    Assets?: Asset[];
}
export declare namespace TrainingData {
    const filterSensitiveLog: (obj: TrainingData) => any;
}
export interface CreateProjectVersionRequest {
    /**
     * <p>The ARN of the Amazon Rekognition Custom Labels project that
     *          manages the model that you want to train.</p>
     */
    ProjectArn: string | undefined;
    /**
     * <p>A name for the version of the model. This value must be unique.</p>
     */
    VersionName: string | undefined;
    /**
     * <p>The Amazon S3 location to store the results of training.</p>
     */
    OutputConfig: OutputConfig | undefined;
    /**
     * <p>The dataset to use for training. </p>
     */
    TrainingData: TrainingData | undefined;
    /**
     * <p>The dataset to use for testing.</p>
     */
    TestingData: TestingData | undefined;
}
export declare namespace CreateProjectVersionRequest {
    const filterSensitiveLog: (obj: CreateProjectVersionRequest) => any;
}
export interface CreateProjectVersionResponse {
    /**
     * <p>The ARN of the model version that was created. Use <code>DescribeProjectVersion</code>
     *          to get the current status of the training operation.</p>
     */
    ProjectVersionArn?: string;
}
export declare namespace CreateProjectVersionResponse {
    const filterSensitiveLog: (obj: CreateProjectVersionResponse) => any;
}
/**
 * <p>The collection specified in the request cannot be found.</p>
 */
export interface ResourceNotFoundException extends __SmithyException, $MetadataBearer {
    name: "ResourceNotFoundException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ResourceNotFoundException {
    const filterSensitiveLog: (obj: ResourceNotFoundException) => any;
}
/**
 * <p>Kinesis video stream stream that provides the source streaming video for a Amazon Rekognition Video stream processor. For more information, see
 *             CreateStreamProcessor in the Amazon Rekognition Developer Guide.</p>
 */
export interface KinesisVideoStream {
    /**
     * <p>ARN of the Kinesis video stream stream that streams the source video.</p>
     */
    Arn?: string;
}
export declare namespace KinesisVideoStream {
    const filterSensitiveLog: (obj: KinesisVideoStream) => any;
}
/**
 * <p>Information about the source streaming video. </p>
 */
export interface StreamProcessorInput {
    /**
     * <p>The Kinesis video stream input stream for the source streaming video.</p>
     */
    KinesisVideoStream?: KinesisVideoStream;
}
export declare namespace StreamProcessorInput {
    const filterSensitiveLog: (obj: StreamProcessorInput) => any;
}
/**
 * <p>The Kinesis data stream Amazon Rekognition to which the analysis results of a Amazon Rekognition stream processor are streamed. For more information, see
 *             CreateStreamProcessor in the Amazon Rekognition Developer Guide.</p>
 */
export interface KinesisDataStream {
    /**
     * <p>ARN of the output Amazon Kinesis Data Streams stream.</p>
     */
    Arn?: string;
}
export declare namespace KinesisDataStream {
    const filterSensitiveLog: (obj: KinesisDataStream) => any;
}
/**
 * <p>Information about the Amazon Kinesis Data Streams stream to which a Amazon Rekognition Video stream processor streams the results of a video analysis. For more
 *            information, see CreateStreamProcessor in the Amazon Rekognition Developer Guide.</p>
 */
export interface StreamProcessorOutput {
    /**
     * <p>The Amazon Kinesis Data Streams stream to which the Amazon Rekognition stream processor streams the analysis results.</p>
     */
    KinesisDataStream?: KinesisDataStream;
}
export declare namespace StreamProcessorOutput {
    const filterSensitiveLog: (obj: StreamProcessorOutput) => any;
}
/**
 * <p>Input face recognition parameters for an Amazon Rekognition stream processor. <code>FaceRecognitionSettings</code> is a request
 *         parameter for <a>CreateStreamProcessor</a>.</p>
 */
export interface FaceSearchSettings {
    /**
     * <p>The ID of a collection that contains faces that you want to search for.</p>
     */
    CollectionId?: string;
    /**
     * <p>Minimum face match confidence score that must be met to return a result for a recognized face. Default is 80.
     *         0 is the lowest confidence. 100 is the highest confidence.</p>
     */
    FaceMatchThreshold?: number;
}
export declare namespace FaceSearchSettings {
    const filterSensitiveLog: (obj: FaceSearchSettings) => any;
}
/**
 * <p>Input parameters used to recognize faces in a streaming video analyzed by a Amazon Rekognition stream processor.</p>
 */
export interface StreamProcessorSettings {
    /**
     * <p>Face search settings to use on a streaming video. </p>
     */
    FaceSearch?: FaceSearchSettings;
}
export declare namespace StreamProcessorSettings {
    const filterSensitiveLog: (obj: StreamProcessorSettings) => any;
}
export interface CreateStreamProcessorRequest {
    /**
     * <p>Kinesis video stream stream that provides the source streaming video. If you are using the AWS CLI, the parameter name is <code>StreamProcessorInput</code>.</p>
     */
    Input: StreamProcessorInput | undefined;
    /**
     * <p>Kinesis data stream stream to which Amazon Rekognition Video puts the analysis results. If you are using the AWS CLI, the parameter name is <code>StreamProcessorOutput</code>.</p>
     */
    Output: StreamProcessorOutput | undefined;
    /**
     * <p>An identifier you assign to the stream processor. You can use <code>Name</code> to
     *             manage the stream processor. For example, you can get the current status of the stream processor by calling <a>DescribeStreamProcessor</a>.
     *              <code>Name</code> is idempotent.
     *        </p>
     */
    Name: string | undefined;
    /**
     * <p>Face recognition input parameters to be used by the stream processor. Includes the collection to use for face recognition and the face
     *         attributes to detect.</p>
     */
    Settings: StreamProcessorSettings | undefined;
    /**
     * <p>ARN of the IAM role that allows access to the stream processor.</p>
     */
    RoleArn: string | undefined;
}
export declare namespace CreateStreamProcessorRequest {
    const filterSensitiveLog: (obj: CreateStreamProcessorRequest) => any;
}
export interface CreateStreamProcessorResponse {
    /**
     * <p>ARN for the newly create stream processor.</p>
     */
    StreamProcessorArn?: string;
}
export declare namespace CreateStreamProcessorResponse {
    const filterSensitiveLog: (obj: CreateStreamProcessorResponse) => any;
}
/**
 * <p>The X and Y coordinates of a point on an image. The X and Y values returned are ratios
 *       of the overall image size. For example, if the input image is 700x200 and the
 *       operation returns X=0.5 and Y=0.25, then the point is at the (350,50) pixel coordinate on the image.</p>
 *
 *          <p>An array of <code>Point</code> objects,
 *       <code>Polygon</code>, is returned by <a>DetectText</a> and by <a>DetectCustomLabels</a>. <code>Polygon</code>
 *       represents a fine-grained polygon around a detected item. For more information, see Geometry in the
 *       Amazon Rekognition Developer Guide. </p>
 */
export interface Point {
    /**
     * <p>The value of the X coordinate for a point on a <code>Polygon</code>.</p>
     */
    X?: number;
    /**
     * <p>The value of the Y coordinate for a point on a <code>Polygon</code>.</p>
     */
    Y?: number;
}
export declare namespace Point {
    const filterSensitiveLog: (obj: Point) => any;
}
/**
 * <p>Information about where an object (<a>DetectCustomLabels</a>) or text (<a>DetectText</a>) is located on
 *       an image.</p>
 */
export interface Geometry {
    /**
     * <p>An axis-aligned coarse representation of the detected item's location on the
     *       image.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>Within the bounding box, a fine-grained polygon around the detected item.</p>
     */
    Polygon?: Point[];
}
export declare namespace Geometry {
    const filterSensitiveLog: (obj: Geometry) => any;
}
/**
 * <p>A custom label detected in an image by a call to <a>DetectCustomLabels</a>.</p>
 */
export interface CustomLabel {
    /**
     * <p>The name of the custom label.</p>
     */
    Name?: string;
    /**
     * <p>The confidence that the model has in the detection of the custom label. The
     *       range is 0-100. A higher value indicates a higher confidence.</p>
     */
    Confidence?: number;
    /**
     * <p>The location of the detected object on the image that corresponds to the custom label.
     *          Includes an axis aligned coarse bounding box surrounding the object and a finer grain polygon
     *          for more accurate spatial information.</p>
     */
    Geometry?: Geometry;
}
export declare namespace CustomLabel {
    const filterSensitiveLog: (obj: CustomLabel) => any;
}
export interface DeleteCollectionRequest {
    /**
     * <p>ID of the collection to delete.</p>
     */
    CollectionId: string | undefined;
}
export declare namespace DeleteCollectionRequest {
    const filterSensitiveLog: (obj: DeleteCollectionRequest) => any;
}
export interface DeleteCollectionResponse {
    /**
     * <p>HTTP status code that indicates the result of the operation.</p>
     */
    StatusCode?: number;
}
export declare namespace DeleteCollectionResponse {
    const filterSensitiveLog: (obj: DeleteCollectionResponse) => any;
}
export interface DeleteFacesRequest {
    /**
     * <p>Collection from which to remove the specific faces.</p>
     */
    CollectionId: string | undefined;
    /**
     * <p>An array of face IDs to delete.</p>
     */
    FaceIds: string[] | undefined;
}
export declare namespace DeleteFacesRequest {
    const filterSensitiveLog: (obj: DeleteFacesRequest) => any;
}
export interface DeleteFacesResponse {
    /**
     * <p>An array of strings (face IDs) of the faces that were deleted.</p>
     */
    DeletedFaces?: string[];
}
export declare namespace DeleteFacesResponse {
    const filterSensitiveLog: (obj: DeleteFacesResponse) => any;
}
export interface DeleteProjectRequest {
    /**
     * <p>The Amazon Resource Name (ARN) of the project that you want to delete.</p>
     */
    ProjectArn: string | undefined;
}
export declare namespace DeleteProjectRequest {
    const filterSensitiveLog: (obj: DeleteProjectRequest) => any;
}
export declare enum ProjectStatus {
    CREATED = "CREATED",
    CREATING = "CREATING",
    DELETING = "DELETING"
}
export interface DeleteProjectResponse {
    /**
     * <p>The current status of the delete project operation.</p>
     */
    Status?: ProjectStatus | string;
}
export declare namespace DeleteProjectResponse {
    const filterSensitiveLog: (obj: DeleteProjectResponse) => any;
}
export interface DeleteProjectVersionRequest {
    /**
     * <p>The Amazon Resource Name (ARN) of the model version that you want to delete.</p>
     */
    ProjectVersionArn: string | undefined;
}
export declare namespace DeleteProjectVersionRequest {
    const filterSensitiveLog: (obj: DeleteProjectVersionRequest) => any;
}
export declare enum ProjectVersionStatus {
    DELETING = "DELETING",
    FAILED = "FAILED",
    RUNNING = "RUNNING",
    STARTING = "STARTING",
    STOPPED = "STOPPED",
    STOPPING = "STOPPING",
    TRAINING_COMPLETED = "TRAINING_COMPLETED",
    TRAINING_FAILED = "TRAINING_FAILED",
    TRAINING_IN_PROGRESS = "TRAINING_IN_PROGRESS"
}
export interface DeleteProjectVersionResponse {
    /**
     * <p>The status of the deletion operation.</p>
     */
    Status?: ProjectVersionStatus | string;
}
export declare namespace DeleteProjectVersionResponse {
    const filterSensitiveLog: (obj: DeleteProjectVersionResponse) => any;
}
export interface DeleteStreamProcessorRequest {
    /**
     * <p>The name of the stream processor you want to delete.</p>
     */
    Name: string | undefined;
}
export declare namespace DeleteStreamProcessorRequest {
    const filterSensitiveLog: (obj: DeleteStreamProcessorRequest) => any;
}
export interface DeleteStreamProcessorResponse {
}
export declare namespace DeleteStreamProcessorResponse {
    const filterSensitiveLog: (obj: DeleteStreamProcessorResponse) => any;
}
export interface DescribeCollectionRequest {
    /**
     * <p>The ID of the collection to describe.</p>
     */
    CollectionId: string | undefined;
}
export declare namespace DescribeCollectionRequest {
    const filterSensitiveLog: (obj: DescribeCollectionRequest) => any;
}
export interface DescribeCollectionResponse {
    /**
     * <p>The number of faces that are indexed into the collection. To index faces into a
     *          collection, use <a>IndexFaces</a>.</p>
     */
    FaceCount?: number;
    /**
     * <p>The version of the face model that's used by the collection for face detection.</p>
     *
     *          <p>For more information, see Model Versioning in the
     *      Amazon Rekognition Developer Guide.</p>
     */
    FaceModelVersion?: string;
    /**
     * <p>The Amazon Resource Name (ARN) of the collection.</p>
     */
    CollectionARN?: string;
    /**
     * <p>The number of milliseconds since the Unix epoch time until the creation of the collection.
     *          The Unix epoch time is 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970.</p>
     */
    CreationTimestamp?: Date;
}
export declare namespace DescribeCollectionResponse {
    const filterSensitiveLog: (obj: DescribeCollectionResponse) => any;
}
export interface DescribeProjectsRequest {
    /**
     * <p>If the previous response was incomplete (because there is more
     *          results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response. You can use this pagination
     *          token to retrieve the next set of results. </p>
     */
    NextToken?: string;
    /**
     * <p>The maximum number of results to return per paginated call. The largest value you can specify is 100.
     *          If you specify a value greater than 100, a ValidationException
     *          error occurs. The default value is 100. </p>
     */
    MaxResults?: number;
}
export declare namespace DescribeProjectsRequest {
    const filterSensitiveLog: (obj: DescribeProjectsRequest) => any;
}
/**
 * <p>A description of a Amazon Rekognition Custom Labels project.</p>
 */
export interface ProjectDescription {
    /**
     * <p>The Amazon Resource Name (ARN) of the project.</p>
     */
    ProjectArn?: string;
    /**
     * <p>The Unix timestamp for the date and time that the project was created.</p>
     */
    CreationTimestamp?: Date;
    /**
     * <p>The current status of the project.</p>
     */
    Status?: ProjectStatus | string;
}
export declare namespace ProjectDescription {
    const filterSensitiveLog: (obj: ProjectDescription) => any;
}
export interface DescribeProjectsResponse {
    /**
     * <p>A list of project descriptions. The list is sorted by the date and time the projects are created.</p>
     */
    ProjectDescriptions?: ProjectDescription[];
    /**
     * <p>If the previous response was incomplete (because there is more
     *          results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response.
     *          You can use this pagination token to retrieve the next set of results. </p>
     */
    NextToken?: string;
}
export declare namespace DescribeProjectsResponse {
    const filterSensitiveLog: (obj: DescribeProjectsResponse) => any;
}
/**
 * <p>Pagination token in the request is not valid.</p>
 */
export interface InvalidPaginationTokenException extends __SmithyException, $MetadataBearer {
    name: "InvalidPaginationTokenException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace InvalidPaginationTokenException {
    const filterSensitiveLog: (obj: InvalidPaginationTokenException) => any;
}
export interface DescribeProjectVersionsRequest {
    /**
     * <p>The Amazon Resource Name (ARN) of the project that contains the models you want to describe.</p>
     */
    ProjectArn: string | undefined;
    /**
     * <p>A list of model version names that you want to describe. You can add up to 10 model version names
     *          to the list. If you don't specify a value, all model descriptions are returned.  A version name is part of a
     *          model (ProjectVersion) ARN. For example, <code>my-model.2020-01-21T09.10.15</code> is the version name in the following ARN.
     *                <code>arn:aws:rekognition:us-east-1:123456789012:project/getting-started/version/<i>my-model.2020-01-21T09.10.15</i>/1234567890123</code>.</p>
     */
    VersionNames?: string[];
    /**
     * <p>If the previous response was incomplete (because there is more
     *            results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response.
     *            You can use this pagination token to retrieve the next set of results. </p>
     */
    NextToken?: string;
    /**
     * <p>The maximum number of results to return per paginated call.
     *           The largest value you can specify is 100. If you specify a value greater than 100, a ValidationException
     *           error occurs. The default value is 100. </p>
     */
    MaxResults?: number;
}
export declare namespace DescribeProjectVersionsRequest {
    const filterSensitiveLog: (obj: DescribeProjectVersionsRequest) => any;
}
/**
 * <p>The S3 bucket that contains the training summary. The training summary includes
 *          aggregated evaluation metrics for the entire testing dataset and metrics for each
 *          individual label.  </p>
 *          <p>You get the training summary S3 bucket location by calling <a>DescribeProjectVersions</a>.
 *          </p>
 */
export interface Summary {
    /**
     * <p>Provides the S3 bucket name and object name.</p>
     *          <p>The region for the S3 bucket containing the S3 object must match the region you use for
     *       Amazon Rekognition operations.</p>
     *
     *          <p>For Amazon Rekognition to process an S3 object, the user must have permission to
     *       access the S3 object. For more information, see Resource-Based Policies in the Amazon Rekognition
     *       Developer Guide. </p>
     */
    S3Object?: S3Object;
}
export declare namespace Summary {
    const filterSensitiveLog: (obj: Summary) => any;
}
/**
 * <p>The evaluation results for the training of a model.</p>
 */
export interface EvaluationResult {
    /**
     * <p>The F1 score for the evaluation of all labels. The F1 score metric evaluates the overall precision
     *          and recall performance of the model as a single value. A higher value indicates better precision
     *          and recall performance. A lower score indicates that precision, recall, or both are performing poorly.
     *
     *   </p>
     */
    F1Score?: number;
    /**
     * <p>The S3 bucket that contains the training summary.</p>
     */
    Summary?: Summary;
}
export declare namespace EvaluationResult {
    const filterSensitiveLog: (obj: EvaluationResult) => any;
}
/**
 * <p>Contains the Amazon S3 bucket location of the validation data for a model training job. </p>
 *
 *          <p>The validation data includes error information for individual
 *          JSON lines in the dataset.
 *             For more information, see Debugging a Failed Model Training in the
 *             Amazon Rekognition Custom Labels Developer Guide. </p>
 *          <p>You get the <code>ValidationData</code> object for the training dataset (<a>TrainingDataResult</a>)
 *          and the test dataset (<a>TestingDataResult</a>) by calling <a>DescribeProjectVersions</a>. </p>
 *          <p>The assets array contains a single <a>Asset</a> object.
 *          The <a>GroundTruthManifest</a> field of the Asset object contains the S3 bucket location of
 *          the validation data.
 * </p>
 */
export interface ValidationData {
    /**
     * <p>The assets that comprise the validation data. </p>
     */
    Assets?: Asset[];
}
export declare namespace ValidationData {
    const filterSensitiveLog: (obj: ValidationData) => any;
}
/**
 * <p>Sagemaker Groundtruth format manifest files for the input, output and validation datasets that are used and created during testing.</p>
 */
export interface TestingDataResult {
    /**
     * <p>The testing dataset that was supplied for training.</p>
     */
    Input?: TestingData;
    /**
     * <p>The subset of the dataset that was actually tested. Some images (assets) might not be tested due to
     *          file formatting and other issues. </p>
     */
    Output?: TestingData;
    /**
     * <p>The location of the data validation manifest. The data validation manifest is created for the test dataset during model training.</p>
     */
    Validation?: ValidationData;
}
export declare namespace TestingDataResult {
    const filterSensitiveLog: (obj: TestingDataResult) => any;
}
/**
 * <p>Sagemaker Groundtruth format manifest files for the input, output and validation datasets that are used and created during testing.</p>
 */
export interface TrainingDataResult {
    /**
     * <p>The training assets that you supplied for training.</p>
     */
    Input?: TrainingData;
    /**
     * <p>The images (assets) that were actually trained by Amazon Rekognition Custom Labels. </p>
     */
    Output?: TrainingData;
    /**
     * <p>The location of the data validation manifest. The data validation manifest is created for the training dataset during model training.</p>
     */
    Validation?: ValidationData;
}
export declare namespace TrainingDataResult {
    const filterSensitiveLog: (obj: TrainingDataResult) => any;
}
/**
 * <p>The description of a version of a model.</p>
 */
export interface ProjectVersionDescription {
    /**
     * <p>The Amazon Resource Name (ARN) of the model version. </p>
     */
    ProjectVersionArn?: string;
    /**
     * <p>The Unix datetime for the date and time that training started.</p>
     */
    CreationTimestamp?: Date;
    /**
     * <p>The minimum number of inference units used by the model. For more information,
     *       see <a>StartProjectVersion</a>.</p>
     */
    MinInferenceUnits?: number;
    /**
     * <p>The current status of the model version.</p>
     */
    Status?: ProjectVersionStatus | string;
    /**
     * <p>A descriptive message for an error or warning that occurred.</p>
     */
    StatusMessage?: string;
    /**
     * <p>The duration, in seconds, that the model version has been billed for training.
     *       This value is only returned if the model version has been successfully trained.</p>
     */
    BillableTrainingTimeInSeconds?: number;
    /**
     * <p>The Unix date and time that training of the model ended.</p>
     */
    TrainingEndTimestamp?: Date;
    /**
     * <p>The location where training results are saved.</p>
     */
    OutputConfig?: OutputConfig;
    /**
     * <p>Contains information about the training results.</p>
     */
    TrainingDataResult?: TrainingDataResult;
    /**
     * <p>Contains information about the testing results.</p>
     */
    TestingDataResult?: TestingDataResult;
    /**
     * <p>The training results. <code>EvaluationResult</code> is only returned if training is successful.</p>
     */
    EvaluationResult?: EvaluationResult;
    /**
     * <p>The location of the summary manifest. The summary manifest provides aggregate data validation results for the training
     *          and test datasets.</p>
     */
    ManifestSummary?: GroundTruthManifest;
}
export declare namespace ProjectVersionDescription {
    const filterSensitiveLog: (obj: ProjectVersionDescription) => any;
}
export interface DescribeProjectVersionsResponse {
    /**
     * <p>A list of model descriptions. The list is sorted by the creation date and time of
     *          the model versions, latest to earliest.</p>
     */
    ProjectVersionDescriptions?: ProjectVersionDescription[];
    /**
     * <p>If the previous response was incomplete (because there is more
     *          results to retrieve), Amazon Rekognition Custom Labels returns a pagination token in the response.
     *          You can use this pagination token to retrieve the next set of results. </p>
     */
    NextToken?: string;
}
export declare namespace DescribeProjectVersionsResponse {
    const filterSensitiveLog: (obj: DescribeProjectVersionsResponse) => any;
}
export interface DescribeStreamProcessorRequest {
    /**
     * <p>Name of the stream processor for which you want information.</p>
     */
    Name: string | undefined;
}
export declare namespace DescribeStreamProcessorRequest {
    const filterSensitiveLog: (obj: DescribeStreamProcessorRequest) => any;
}
export declare enum StreamProcessorStatus {
    FAILED = "FAILED",
    RUNNING = "RUNNING",
    STARTING = "STARTING",
    STOPPED = "STOPPED",
    STOPPING = "STOPPING"
}
export interface DescribeStreamProcessorResponse {
    /**
     * <p>Name of the stream processor. </p>
     */
    Name?: string;
    /**
     * <p>ARN of the stream processor.</p>
     */
    StreamProcessorArn?: string;
    /**
     * <p>Current status of the stream processor.</p>
     */
    Status?: StreamProcessorStatus | string;
    /**
     * <p>Detailed status message about the stream processor.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Date and time the stream processor was created</p>
     */
    CreationTimestamp?: Date;
    /**
     * <p>The time, in Unix format, the stream processor was last updated. For example, when the stream
     *         processor moves from a running state to a failed state, or when the user starts or stops the stream processor.</p>
     */
    LastUpdateTimestamp?: Date;
    /**
     * <p>Kinesis video stream that provides the source streaming video.</p>
     */
    Input?: StreamProcessorInput;
    /**
     * <p>Kinesis data stream to which Amazon Rekognition Video puts the analysis results.</p>
     */
    Output?: StreamProcessorOutput;
    /**
     * <p>ARN of the IAM role that allows access to the stream processor.</p>
     */
    RoleArn?: string;
    /**
     * <p>Face recognition input parameters that are being used by the stream processor.
     *             Includes the collection to use for face recognition and the face
     *             attributes to detect.</p>
     */
    Settings?: StreamProcessorSettings;
}
export declare namespace DescribeStreamProcessorResponse {
    const filterSensitiveLog: (obj: DescribeStreamProcessorResponse) => any;
}
export interface DetectCustomLabelsRequest {
    /**
     * <p>The ARN of the model version that you want to use.</p>
     */
    ProjectVersionArn: string | undefined;
    /**
     * <p>Provides the input image either as bytes or an S3 object.</p>
     *          <p>You pass image bytes to an Amazon Rekognition API operation by using the <code>Bytes</code>
     *       property. For example, you would use the <code>Bytes</code> property to pass an image loaded
     *       from a local file system. Image bytes passed by using the <code>Bytes</code> property must be
     *       base64-encoded. Your code may not need to encode image bytes if you are using an AWS SDK to
     *       call Amazon Rekognition API operations. </p>
     *
     *          <p>For more information, see Analyzing an Image Loaded from a Local File System
     *       in the Amazon Rekognition Developer Guide.</p>
     *          <p> You pass images stored in an S3 bucket to an Amazon Rekognition API operation by using the
     *         <code>S3Object</code> property. Images stored in an S3 bucket do not need to be
     *       base64-encoded.</p>
     *          <p>The region for the S3 bucket containing the S3 object must match the region you use for
     *       Amazon Rekognition operations.</p>
     *          <p>If you use the
     *       AWS
     *       CLI to call Amazon Rekognition operations, passing image bytes using the Bytes
     *       property is not supported. You must first upload the image to an Amazon S3 bucket and then
     *       call the operation using the S3Object property.</p>
     *
     *          <p>For Amazon Rekognition to process an S3 object, the user must have permission to access the S3
     *       object. For more information, see Resource Based Policies in the Amazon Rekognition Developer Guide.
     *     </p>
     */
    Image: Image | undefined;
    /**
     * <p>Maximum number of results you want the service to return in the response.
     *          The service returns the specified number of highest confidence labels ranked from highest confidence
     *       to lowest.</p>
     */
    MaxResults?: number;
    /**
     * <p>Specifies the minimum confidence level for the labels to return.
     *          Amazon Rekognition doesn't return any labels with a confidence lower than this specified value. If you specify a
     *       value of 0, all labels are return, regardless of the default thresholds that the model version applies.</p>
     */
    MinConfidence?: number;
}
export declare namespace DetectCustomLabelsRequest {
    const filterSensitiveLog: (obj: DetectCustomLabelsRequest) => any;
}
export interface DetectCustomLabelsResponse {
    /**
     * <p>An array of custom labels detected in the input image.</p>
     */
    CustomLabels?: CustomLabel[];
}
export declare namespace DetectCustomLabelsResponse {
    const filterSensitiveLog: (obj: DetectCustomLabelsResponse) => any;
}
/**
 * <p>The requested resource isn't ready. For example,
 *          this exception occurs when you call <code>DetectCustomLabels</code> with a
 *          model version that isn't deployed. </p>
 */
export interface ResourceNotReadyException extends __SmithyException, $MetadataBearer {
    name: "ResourceNotReadyException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ResourceNotReadyException {
    const filterSensitiveLog: (obj: ResourceNotReadyException) => any;
}
export interface DetectFacesRequest {
    /**
     * <p>The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call
     *       Amazon Rekognition operations, passing base64-encoded image bytes is not supported. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
    /**
     * <p>An array of facial attributes you want to be returned. This can be the default list of
     *       attributes or all attributes. If you don't specify a value for <code>Attributes</code> or if
     *       you specify <code>["DEFAULT"]</code>, the API returns the following subset of facial
     *       attributes: <code>BoundingBox</code>, <code>Confidence</code>, <code>Pose</code>,
     *         <code>Quality</code>, and <code>Landmarks</code>. If you provide <code>["ALL"]</code>, all
     *       facial attributes are returned, but the operation takes longer to complete.</p>
     *          <p>If you provide both, <code>["ALL", "DEFAULT"]</code>, the service uses a logical AND
     *       operator to determine which attributes to return (in this case, all attributes). </p>
     */
    Attributes?: (Attribute | string)[];
}
export declare namespace DetectFacesRequest {
    const filterSensitiveLog: (obj: DetectFacesRequest) => any;
}
export interface DetectFacesResponse {
    /**
     * <p>Details of each face found in the image. </p>
     */
    FaceDetails?: FaceDetail[];
    /**
     * <p>The value of <code>OrientationCorrection</code> is always null.</p>
     *          <p>If the input image is in .jpeg format, it might contain exchangeable image file format (Exif) metadata
     *       that includes the image's orientation. Amazon Rekognition uses this orientation information to perform
     *       image correction. The bounding box coordinates are translated to represent object locations
     *       after the orientation information in the Exif metadata is used to correct the image orientation.
     *       Images in .png format don't contain Exif metadata.</p>
     *          <p>Amazon Rekognition doesn’t perform image correction for images in .png format and
     *       .jpeg images without orientation information in the image Exif metadata. The bounding box
     *       coordinates aren't translated and represent the object locations before the image is rotated.
     *     </p>
     */
    OrientationCorrection?: OrientationCorrection | string;
}
export declare namespace DetectFacesResponse {
    const filterSensitiveLog: (obj: DetectFacesResponse) => any;
}
/**
 * <p>A set of parameters that allow you to filter out certain results from your returned results.</p>
 */
export interface DetectionFilter {
    /**
     * <p>Sets confidence of word detection. Words with detection confidence below this will be excluded
     *       from the result. Values should be between 0.5 and 1 as Text in Video will not return any result below
     *       0.5.</p>
     */
    MinConfidence?: number;
    /**
     * <p>Sets the minimum height of the word bounding box. Words with bounding box heights lesser than
     *       this value will be excluded from the result. Value is relative to the video frame height.</p>
     */
    MinBoundingBoxHeight?: number;
    /**
     * <p>Sets the minimum width of the word bounding box. Words with bounding boxes widths lesser than
     *       this value will be excluded from the result. Value is relative to the video frame width.</p>
     */
    MinBoundingBoxWidth?: number;
}
export declare namespace DetectionFilter {
    const filterSensitiveLog: (obj: DetectionFilter) => any;
}
export interface DetectLabelsRequest {
    /**
     * <p>The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call
     *       Amazon Rekognition operations, passing image bytes is not supported. Images stored in an S3 Bucket do
     *     not need to be base64-encoded.</p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
    /**
     * <p>Maximum number of labels you want the service to return in the response. The service
     *       returns the specified number of highest confidence labels. </p>
     */
    MaxLabels?: number;
    /**
     * <p>Specifies the minimum confidence level for the labels to return. Amazon Rekognition doesn't
     *       return any labels with confidence lower than this specified value.</p>
     *          <p>If <code>MinConfidence</code> is not specified, the operation returns labels with a
     *       confidence values greater than or equal to 55 percent.</p>
     */
    MinConfidence?: number;
}
export declare namespace DetectLabelsRequest {
    const filterSensitiveLog: (obj: DetectLabelsRequest) => any;
}
/**
 * <p>An instance of a label returned by Amazon Rekognition Image (<a>DetectLabels</a>)
 *       or by Amazon Rekognition Video (<a>GetLabelDetection</a>).</p>
 */
export interface Instance {
    /**
     * <p>The position of the label instance on the image.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>The confidence that Amazon Rekognition has in the accuracy of the bounding box.</p>
     */
    Confidence?: number;
}
export declare namespace Instance {
    const filterSensitiveLog: (obj: Instance) => any;
}
/**
 * <p>A parent label for a label. A label can have 0, 1, or more parents. </p>
 */
export interface Parent {
    /**
     * <p>The name of the parent label.</p>
     */
    Name?: string;
}
export declare namespace Parent {
    const filterSensitiveLog: (obj: Parent) => any;
}
/**
 * <p>Structure containing details about the detected label, including the name, detected instances, parent labels, and level of
 *       confidence.</p>
 *          <p>
 *     </p>
 */
export interface Label {
    /**
     * <p>The name (label) of the object or scene.</p>
     */
    Name?: string;
    /**
     * <p>Level of confidence.</p>
     */
    Confidence?: number;
    /**
     * <p>If <code>Label</code> represents an object, <code>Instances</code> contains the bounding boxes for each instance of the detected object.
     *       Bounding boxes are returned for common object labels such as people, cars, furniture, apparel or pets.</p>
     */
    Instances?: Instance[];
    /**
     * <p>The parent labels for a label. The response includes all ancestor labels.</p>
     */
    Parents?: Parent[];
}
export declare namespace Label {
    const filterSensitiveLog: (obj: Label) => any;
}
export interface DetectLabelsResponse {
    /**
     * <p>An array of labels for the real-world objects detected. </p>
     */
    Labels?: Label[];
    /**
     * <p>The value of <code>OrientationCorrection</code> is always null.</p>
     *          <p>If the input image is in .jpeg format, it might contain exchangeable image file format (Exif) metadata
     *       that includes the image's orientation. Amazon Rekognition uses this orientation information to perform
     *       image correction. The bounding box coordinates are translated to represent object locations
     *       after the orientation information in the Exif metadata is used to correct the image orientation.
     *       Images in .png format don't contain Exif metadata.</p>
     *          <p>Amazon Rekognition doesn’t perform image correction for images in .png format and
     *          .jpeg images without orientation information in the image Exif metadata. The bounding box
     *          coordinates aren't translated and represent the object locations before the image is rotated.
     *       </p>
     */
    OrientationCorrection?: OrientationCorrection | string;
    /**
     * <p>Version number of the label detection model that was used to detect labels.</p>
     */
    LabelModelVersion?: string;
}
export declare namespace DetectLabelsResponse {
    const filterSensitiveLog: (obj: DetectLabelsResponse) => any;
}
/**
 * <p>Allows you to set attributes of the image. Currently, you can declare an image as free of
 *       personally identifiable information.</p>
 */
export interface HumanLoopDataAttributes {
    /**
     * <p>Sets whether the input image is free of personally identifiable information.</p>
     */
    ContentClassifiers?: (ContentClassifier | string)[];
}
export declare namespace HumanLoopDataAttributes {
    const filterSensitiveLog: (obj: HumanLoopDataAttributes) => any;
}
/**
 * <p>Sets up the flow definition the image will be sent to if one of the conditions is met.
 *       You can also set certain attributes of the image before review.</p>
 */
export interface HumanLoopConfig {
    /**
     * <p>The name of the human review used for this image. This should be kept unique within a region.</p>
     */
    HumanLoopName: string | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of the flow definition. You can create a flow definition by using the Amazon Sagemaker
     *       <a href="https://docs.aws.amazon.com/sagemaker/latest/dg/API_CreateFlowDefinition.html">CreateFlowDefinition</a>
     *      Operation. </p>
     */
    FlowDefinitionArn: string | undefined;
    /**
     * <p>Sets attributes of the input data.</p>
     */
    DataAttributes?: HumanLoopDataAttributes;
}
export declare namespace HumanLoopConfig {
    const filterSensitiveLog: (obj: HumanLoopConfig) => any;
}
export interface DetectModerationLabelsRequest {
    /**
     * <p>The input image as base64-encoded bytes or an S3 object.
     *       If you use the AWS CLI to call Amazon Rekognition operations,
     *       passing base64-encoded image bytes is not supported. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
    /**
     * <p>Specifies the minimum confidence level for the labels to return. Amazon Rekognition doesn't
     *       return any labels with a confidence level lower than this specified value.</p>
     *          <p>If you don't specify <code>MinConfidence</code>, the operation returns labels with
     *       confidence values greater than or equal to 50 percent.</p>
     */
    MinConfidence?: number;
    /**
     * <p>Sets up the configuration for human evaluation, including the FlowDefinition
     *       the image will be sent to.</p>
     */
    HumanLoopConfig?: HumanLoopConfig;
}
export declare namespace DetectModerationLabelsRequest {
    const filterSensitiveLog: (obj: DetectModerationLabelsRequest) => any;
}
/**
 * <p>Shows the results of the human in the loop evaluation. If there is no HumanLoopArn, the input did
 *        not trigger human review.</p>
 */
export interface HumanLoopActivationOutput {
    /**
     * <p>The Amazon Resource Name (ARN) of the HumanLoop created.</p>
     */
    HumanLoopArn?: string;
    /**
     * <p>Shows if and why human review was needed.</p>
     */
    HumanLoopActivationReasons?: string[];
    /**
     * <p>Shows the result of condition evaluations, including those conditions which activated a
     *       human review.</p>
     */
    HumanLoopActivationConditionsEvaluationResults?: __LazyJsonString | string;
}
export declare namespace HumanLoopActivationOutput {
    const filterSensitiveLog: (obj: HumanLoopActivationOutput) => any;
}
export interface DetectModerationLabelsResponse {
    /**
     * <p>Array of detected Moderation labels and the time, in milliseconds from the
     *       start of the video, they were detected.</p>
     */
    ModerationLabels?: ModerationLabel[];
    /**
     * <p>Version number of the moderation detection model that was used to detect unsafe content.</p>
     */
    ModerationModelVersion?: string;
    /**
     * <p>Shows the results of the human in the loop evaluation.</p>
     */
    HumanLoopActivationOutput?: HumanLoopActivationOutput;
}
export declare namespace DetectModerationLabelsResponse {
    const filterSensitiveLog: (obj: DetectModerationLabelsResponse) => any;
}
/**
 * <p>The number of in-progress human reviews you have has exceeded the number allowed.</p>
 */
export interface HumanLoopQuotaExceededException extends __SmithyException, $MetadataBearer {
    name: "HumanLoopQuotaExceededException";
    $fault: "client";
    /**
     * <p>The resource type.</p>
     */
    ResourceType?: string;
    /**
     * <p>The quota code.</p>
     */
    QuotaCode?: string;
    /**
     * <p>The service code.</p>
     */
    ServiceCode?: string;
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace HumanLoopQuotaExceededException {
    const filterSensitiveLog: (obj: HumanLoopQuotaExceededException) => any;
}
/**
 * <p>Specifies summary attributes to return from a call to <a>DetectProtectiveEquipment</a>.
 *          You can specify which types of PPE to summarize. You can also specify a minimum confidence value for detections.
 *          Summary information is returned in the <code>Summary</code> (<a>ProtectiveEquipmentSummary</a>) field of the response from
 *          <code>DetectProtectiveEquipment</code>.
 *          The summary includes which persons in an image were detected wearing the requested types of person protective equipment (PPE), which persons
 *          were detected as not wearing PPE, and the persons in which a determination could not be made. For more information,
 *          see <a>ProtectiveEquipmentSummary</a>.</p>
 */
export interface ProtectiveEquipmentSummarizationAttributes {
    /**
     * <p>The minimum confidence level for which you want summary information.
     *          The confidence level applies to person detection, body part detection, equipment detection, and body part coverage.
     *          Amazon Rekognition doesn't return summary information with a confidence than this specified value. There isn't a
     *          default value.</p>
     *          <p>Specify a <code>MinConfidence</code> value that is between 50-100% as <code>DetectProtectiveEquipment</code>
     *          returns predictions only where the detection confidence is between 50% - 100%.
     *          If you specify a value that is less than 50%, the results are the same specifying a value of 50%.</p>
     *          <p>
     *       </p>
     */
    MinConfidence: number | undefined;
    /**
     * <p>An array of personal protective equipment types for which you want summary information.
     *          If a person is detected wearing a required requipment type, the person's ID is added to the
     *          <code>PersonsWithRequiredEquipment</code> array field returned in <a>ProtectiveEquipmentSummary</a>
     *          by <code>DetectProtectiveEquipment</code>.  </p>
     */
    RequiredEquipmentTypes: (ProtectiveEquipmentType | string)[] | undefined;
}
export declare namespace ProtectiveEquipmentSummarizationAttributes {
    const filterSensitiveLog: (obj: ProtectiveEquipmentSummarizationAttributes) => any;
}
export interface DetectProtectiveEquipmentRequest {
    /**
     * <p>The image in which you want to detect PPE on detected persons. The image can be passed as image bytes or you can
     *          reference an image stored in an Amazon S3 bucket. </p>
     */
    Image: Image | undefined;
    /**
     * <p>An array of PPE types that you want to summarize.</p>
     */
    SummarizationAttributes?: ProtectiveEquipmentSummarizationAttributes;
}
export declare namespace DetectProtectiveEquipmentRequest {
    const filterSensitiveLog: (obj: DetectProtectiveEquipmentRequest) => any;
}
/**
 * <p>A person detected by a call to <a>DetectProtectiveEquipment</a>. The API returns
 *          all persons detected in the input
 *          image in an array of <code>ProtectiveEquipmentPerson</code> objects.</p>
 */
export interface ProtectiveEquipmentPerson {
    /**
     * <p>An array of body parts detected on a person's body (including body parts without PPE). </p>
     */
    BodyParts?: ProtectiveEquipmentBodyPart[];
    /**
     * <p>A bounding box around the detected person.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>The confidence that Amazon Rekognition has that the bounding box contains a person.</p>
     */
    Confidence?: number;
    /**
     * <p>The identifier for the detected person. The identifier is only unique for a single call to
     *          <code>DetectProtectiveEquipment</code>.</p>
     */
    Id?: number;
}
export declare namespace ProtectiveEquipmentPerson {
    const filterSensitiveLog: (obj: ProtectiveEquipmentPerson) => any;
}
/**
 * <p>Summary information for required items of personal protective equipment (PPE) detected on persons by a call
 *          to <a>DetectProtectiveEquipment</a>. You specify the required type of PPE in
 *          the <code>SummarizationAttributes</code>
 *          (<a>ProtectiveEquipmentSummarizationAttributes</a>) input parameter.
 *          The summary includes which persons were detected wearing the required personal protective equipment
 *          (<code>PersonsWithRequiredEquipment</code>),
 *          which persons were detected as not wearing the required PPE (<code>PersonsWithoutRequiredEquipment</code>),
 *          and the persons in which a determination
 *          could not be made (<code>PersonsIndeterminate</code>).</p>
 *          <p>To get a total for each category, use the size of the field array. For example,
 *          to find out how many people were detected as wearing the specified PPE,
 *          use the size of the <code>PersonsWithRequiredEquipment</code> array.
 *          If you want to find out more about a person, such as the
 *          location (<a>BoundingBox</a>) of the person on the image, use the person ID in each array element.
 *          Each person ID matches the ID field of a <a>ProtectiveEquipmentPerson</a> object returned
 *          in the <code>Persons</code> array by <code>DetectProtectiveEquipment</code>.</p>
 */
export interface ProtectiveEquipmentSummary {
    /**
     * <p>An array of IDs for persons who are wearing detected personal protective equipment.
     *       </p>
     */
    PersonsWithRequiredEquipment?: number[];
    /**
     * <p>An array of IDs for persons who are not wearing all of the types of PPE specified in the RequiredEquipmentTypes field of
     *          the detected personal protective equipment.
     *       </p>
     */
    PersonsWithoutRequiredEquipment?: number[];
    /**
     * <p>An array of IDs for persons where it was not possible to determine if they are wearing personal protective equipment.
     *       </p>
     */
    PersonsIndeterminate?: number[];
}
export declare namespace ProtectiveEquipmentSummary {
    const filterSensitiveLog: (obj: ProtectiveEquipmentSummary) => any;
}
export interface DetectProtectiveEquipmentResponse {
    /**
     * <p>The version number of the PPE detection model used to detect PPE in the image.</p>
     */
    ProtectiveEquipmentModelVersion?: string;
    /**
     * <p>An array of persons detected in the image (including persons not wearing PPE).</p>
     */
    Persons?: ProtectiveEquipmentPerson[];
    /**
     * <p>Summary information for the types of PPE specified in the <code>SummarizationAttributes</code> input
     *       parameter.</p>
     */
    Summary?: ProtectiveEquipmentSummary;
}
export declare namespace DetectProtectiveEquipmentResponse {
    const filterSensitiveLog: (obj: DetectProtectiveEquipmentResponse) => any;
}
/**
 * <p>Specifies a location within the frame that Rekognition checks for text. Uses a <code>BoundingBox</code>
 *       object to set a region of the screen.</p>
 *          <p>A word is included in the region if the word is more than half in that region. If there is more than
 *       one region, the word will be compared with all regions of the screen. Any word more than half in a region
 *       is kept in the results.</p>
 */
export interface RegionOfInterest {
    /**
     * <p>The box representing a region of interest on screen.</p>
     */
    BoundingBox?: BoundingBox;
}
export declare namespace RegionOfInterest {
    const filterSensitiveLog: (obj: RegionOfInterest) => any;
}
/**
 * <p>A set of optional parameters that you can use to set the criteria that the text must meet to be included in your response.
 *       <code>WordFilter</code> looks at a word’s height, width, and minimum confidence. <code>RegionOfInterest</code>
 *       lets you set a specific region of the image to look for text in.
 *       </p>
 */
export interface DetectTextFilters {
    /**
     * <p>A set of parameters that allow you to filter out certain results from your returned results.</p>
     */
    WordFilter?: DetectionFilter;
    /**
     * <p> A Filter focusing on a certain area of the image. Uses a <code>BoundingBox</code> object to set the region
     *       of the image.</p>
     */
    RegionsOfInterest?: RegionOfInterest[];
}
export declare namespace DetectTextFilters {
    const filterSensitiveLog: (obj: DetectTextFilters) => any;
}
export interface DetectTextRequest {
    /**
     * <p>The input image as base64-encoded bytes or an Amazon S3 object. If you use the AWS CLI
     *       to call Amazon Rekognition operations, you can't pass image bytes. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
    /**
     * <p>Optional parameters that let you set the criteria that the text must meet to be included in your response.</p>
     */
    Filters?: DetectTextFilters;
}
export declare namespace DetectTextRequest {
    const filterSensitiveLog: (obj: DetectTextRequest) => any;
}
export declare enum TextTypes {
    LINE = "LINE",
    WORD = "WORD"
}
/**
 * <p>Information about a word or line of text detected by <a>DetectText</a>.</p>
 *          <p>The <code>DetectedText</code> field contains the text that Amazon Rekognition detected in the
 *       image. </p>
 *          <p>Every word and line has an identifier (<code>Id</code>). Each word belongs to a line
 *       and has a parent identifier (<code>ParentId</code>) that identifies the line of text in which
 *       the word appears. The word <code>Id</code> is also an index for the word within a line of
 *       words. </p>
 *
 *          <p>For more information, see Detecting Text in the Amazon Rekognition Developer Guide.</p>
 */
export interface TextDetection {
    /**
     * <p>The word or line of text recognized by Amazon Rekognition. </p>
     */
    DetectedText?: string;
    /**
     * <p>The type of text that was detected.</p>
     */
    Type?: TextTypes | string;
    /**
     * <p>The identifier for the detected text. The identifier is only unique for a single call
     *       to <code>DetectText</code>. </p>
     */
    Id?: number;
    /**
     * <p>The Parent identifier for the detected text identified by the value of <code>ID</code>.
     *       If the type of detected text is <code>LINE</code>, the value of <code>ParentId</code> is
     *         <code>Null</code>. </p>
     */
    ParentId?: number;
    /**
     * <p>The confidence that Amazon Rekognition has in the accuracy of the detected text and the accuracy
     *       of the geometry points around the detected text.</p>
     */
    Confidence?: number;
    /**
     * <p>The location of the detected text on the image. Includes an axis aligned coarse
     *       bounding box surrounding the text and a finer grain polygon for more accurate spatial
     *       information.</p>
     */
    Geometry?: Geometry;
}
export declare namespace TextDetection {
    const filterSensitiveLog: (obj: TextDetection) => any;
}
export interface DetectTextResponse {
    /**
     * <p>An array of text that was detected in the input image.</p>
     */
    TextDetections?: TextDetection[];
    /**
     * <p>The model version used to detect text.</p>
     */
    TextModelVersion?: string;
}
export declare namespace DetectTextResponse {
    const filterSensitiveLog: (obj: DetectTextResponse) => any;
}
/**
 * <p>Describes the face properties such as the bounding box, face ID, image ID of the input
 *       image, and external image ID that you assigned. </p>
 */
export interface Face {
    /**
     * <p>Unique identifier that Amazon Rekognition assigns to the face.</p>
     */
    FaceId?: string;
    /**
     * <p>Bounding box of the face.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>Unique identifier that Amazon Rekognition assigns to the input image.</p>
     */
    ImageId?: string;
    /**
     * <p>Identifier that you assign to all the faces in the input image.</p>
     */
    ExternalImageId?: string;
    /**
     * <p>Confidence level that the bounding box contains a face (and not a different object such
     *       as a tree).</p>
     */
    Confidence?: number;
}
export declare namespace Face {
    const filterSensitiveLog: (obj: Face) => any;
}
export declare enum FaceAttributes {
    ALL = "ALL",
    DEFAULT = "DEFAULT"
}
/**
 * <p>Information about a face detected in a video analysis request and the time the face was detected in the video. </p>
 */
export interface FaceDetection {
    /**
     * <p>Time, in milliseconds from the start of the video, that the face was detected.</p>
     */
    Timestamp?: number;
    /**
     * <p>The face properties for the detected face.</p>
     */
    Face?: FaceDetail;
}
export declare namespace FaceDetection {
    const filterSensitiveLog: (obj: FaceDetection) => any;
}
/**
 * <p>Provides face metadata. In addition, it also provides the confidence in the match of
 *       this face with the input face.</p>
 */
export interface FaceMatch {
    /**
     * <p>Confidence in the match of this face with the input face.</p>
     */
    Similarity?: number;
    /**
     * <p>Describes the face properties such as the bounding box, face ID, image ID of the source
     *       image, and external image ID that you assigned.</p>
     */
    Face?: Face;
}
export declare namespace FaceMatch {
    const filterSensitiveLog: (obj: FaceMatch) => any;
}
/**
 * <p>Object containing both the face metadata (stored in the backend database), and facial
 *       attributes that are detected but aren't stored in the database.</p>
 */
export interface FaceRecord {
    /**
     * <p>Describes the face properties such as the bounding box, face ID, image ID of the input
     *       image, and external image ID that you assigned. </p>
     */
    Face?: Face;
    /**
     * <p>Structure containing attributes of the face that the algorithm detected.</p>
     */
    FaceDetail?: FaceDetail;
}
export declare namespace FaceRecord {
    const filterSensitiveLog: (obj: FaceRecord) => any;
}
export declare enum FaceSearchSortBy {
    INDEX = "INDEX",
    TIMESTAMP = "TIMESTAMP"
}
export interface GetCelebrityInfoRequest {
    /**
     * <p>The ID for the celebrity. You get the celebrity ID from a call to the <a>RecognizeCelebrities</a> operation,
     *    which recognizes celebrities in an image. </p>
     */
    Id: string | undefined;
}
export declare namespace GetCelebrityInfoRequest {
    const filterSensitiveLog: (obj: GetCelebrityInfoRequest) => any;
}
export interface GetCelebrityInfoResponse {
    /**
     * <p>An array of URLs pointing to additional celebrity information. </p>
     */
    Urls?: string[];
    /**
     * <p>The name of the celebrity.</p>
     */
    Name?: string;
}
export declare namespace GetCelebrityInfoResponse {
    const filterSensitiveLog: (obj: GetCelebrityInfoResponse) => any;
}
export interface GetCelebrityRecognitionRequest {
    /**
     * <p>Job identifier for the required celebrity recognition analysis. You can get the job identifer from
     *       a call to <code>StartCelebrityRecognition</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.
     *       If you specify a value greater than 1000, a maximum of 1000 results is returned.
     *       The default value is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there is more recognized celebrities to retrieve), Amazon Rekognition Video returns a pagination
     *       token in the response. You can use this pagination token to retrieve the next set of celebrities. </p>
     */
    NextToken?: string;
    /**
     * <p>Sort to use for celebrities returned in <code>Celebrities</code> field. Specify <code>ID</code> to sort by the celebrity identifier,
     *         specify <code>TIMESTAMP</code> to sort by the time the celebrity was recognized.</p>
     */
    SortBy?: CelebrityRecognitionSortBy | string;
}
export declare namespace GetCelebrityRecognitionRequest {
    const filterSensitiveLog: (obj: GetCelebrityRecognitionRequest) => any;
}
export declare enum VideoJobStatus {
    FAILED = "FAILED",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCEEDED = "SUCCEEDED"
}
/**
 * <p>Information about a video that Amazon Rekognition analyzed. <code>Videometadata</code> is returned in
 *             every page of paginated responses from a Amazon Rekognition video operation.</p>
 */
export interface VideoMetadata {
    /**
     * <p>Type of compression used in the analyzed video. </p>
     */
    Codec?: string;
    /**
     * <p>Length of the video in milliseconds.</p>
     */
    DurationMillis?: number;
    /**
     * <p>Format of the analyzed video. Possible values are MP4, MOV and AVI. </p>
     */
    Format?: string;
    /**
     * <p>Number of frames per second in the video.</p>
     */
    FrameRate?: number;
    /**
     * <p>Vertical pixel dimension of the video.</p>
     */
    FrameHeight?: number;
    /**
     * <p>Horizontal pixel dimension of the video.</p>
     */
    FrameWidth?: number;
}
export declare namespace VideoMetadata {
    const filterSensitiveLog: (obj: VideoMetadata) => any;
}
export interface GetCelebrityRecognitionResponse {
    /**
     * <p>The current status of the celebrity recognition job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Information about a video that Amazon Rekognition Video analyzed. <code>Videometadata</code> is returned in
     *       every page of paginated responses from a Amazon Rekognition Video operation.</p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent request
     *       to retrieve the next set of celebrities.</p>
     */
    NextToken?: string;
    /**
     * <p>Array of celebrities recognized in the video.</p>
     */
    Celebrities?: CelebrityRecognition[];
}
export declare namespace GetCelebrityRecognitionResponse {
    const filterSensitiveLog: (obj: GetCelebrityRecognitionResponse) => any;
}
export interface GetContentModerationRequest {
    /**
     * <p>The identifier for the unsafe content job. Use <code>JobId</code> to identify the job in
     *        a subsequent call to <code>GetContentModeration</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.
     *     If you specify a value greater than 1000, a maximum of 1000 results is returned.
     *     The default value is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there is more data to retrieve), Amazon Rekognition
     *         returns a pagination token in the response. You can use this pagination token
     *         to retrieve the next set of unsafe content labels.</p>
     */
    NextToken?: string;
    /**
     * <p>Sort to use for elements in the <code>ModerationLabelDetections</code> array.
     *        Use <code>TIMESTAMP</code> to sort array elements by the time labels are detected.
     *        Use <code>NAME</code> to alphabetically group elements for a label together.
     *        Within each label group, the array element are sorted by detection confidence.
     *        The default sort is by <code>TIMESTAMP</code>.</p>
     */
    SortBy?: ContentModerationSortBy | string;
}
export declare namespace GetContentModerationRequest {
    const filterSensitiveLog: (obj: GetContentModerationRequest) => any;
}
export interface GetContentModerationResponse {
    /**
     * <p>The current status of the unsafe content analysis job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Information about a video that Amazon Rekognition analyzed. <code>Videometadata</code>
     *      is returned in every page of paginated responses from <code>GetContentModeration</code>. </p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>The detected unsafe content labels and the time(s) they were detected.</p>
     */
    ModerationLabels?: ContentModerationDetection[];
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent
     *      request to retrieve the next set of unsafe content labels. </p>
     */
    NextToken?: string;
    /**
     * <p>Version number of the moderation detection model that was used to detect unsafe content.</p>
     */
    ModerationModelVersion?: string;
}
export declare namespace GetContentModerationResponse {
    const filterSensitiveLog: (obj: GetContentModerationResponse) => any;
}
export interface GetFaceDetectionRequest {
    /**
     * <p>Unique identifier for the face detection job. The <code>JobId</code> is returned from <code>StartFaceDetection</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.
     *        If you specify a value greater than 1000, a maximum of 1000 results is returned.
     *        The default value is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there are more faces to retrieve), Amazon Rekognition Video returns a pagination
     *        token in the response. You can use this pagination token to retrieve the next set of faces.</p>
     */
    NextToken?: string;
}
export declare namespace GetFaceDetectionRequest {
    const filterSensitiveLog: (obj: GetFaceDetectionRequest) => any;
}
export interface GetFaceDetectionResponse {
    /**
     * <p>The current status of the face detection job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Information about a video that Amazon Rekognition Video analyzed. <code>Videometadata</code> is returned in
     *        every page of paginated responses from a Amazon Rekognition video operation.</p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>If the response is truncated, Amazon Rekognition returns this token that you can use in the subsequent request to retrieve the next set of faces. </p>
     */
    NextToken?: string;
    /**
     * <p>An array of faces detected in the video. Each element contains a detected face's details and the time,
     *        in milliseconds from the start of the video, the face was detected. </p>
     */
    Faces?: FaceDetection[];
}
export declare namespace GetFaceDetectionResponse {
    const filterSensitiveLog: (obj: GetFaceDetectionResponse) => any;
}
export interface GetFaceSearchRequest {
    /**
     * <p>The job identifer for the search request. You get the job identifier from an initial call to <code>StartFaceSearch</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.
     *       If you specify a value greater than 1000, a maximum of 1000 results is returned.
     *       The default value is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there is more search results to retrieve), Amazon Rekognition Video returns a pagination
     *       token in the response. You can use this pagination token to retrieve the next set of search results. </p>
     */
    NextToken?: string;
    /**
     * <p>Sort to use for grouping faces in the response. Use <code>TIMESTAMP</code> to group faces by the time
     *       that they are recognized. Use <code>INDEX</code> to sort by recognized faces. </p>
     */
    SortBy?: FaceSearchSortBy | string;
}
export declare namespace GetFaceSearchRequest {
    const filterSensitiveLog: (obj: GetFaceSearchRequest) => any;
}
/**
 * <p>Details about a person detected in a video analysis request.</p>
 */
export interface PersonDetail {
    /**
     * <p>Identifier for the person detected person within a video. Use to keep track of the person throughout the video. The identifier is not stored by Amazon Rekognition.</p>
     */
    Index?: number;
    /**
     * <p>Bounding box around the detected person.</p>
     */
    BoundingBox?: BoundingBox;
    /**
     * <p>Face details for the detected person.</p>
     */
    Face?: FaceDetail;
}
export declare namespace PersonDetail {
    const filterSensitiveLog: (obj: PersonDetail) => any;
}
/**
 * <p>Information about a person whose face matches a face(s) in an Amazon Rekognition collection.
 *       Includes information about the faces in the Amazon Rekognition collection (<a>FaceMatch</a>), information about the person (<a>PersonDetail</a>),
 *       and the time stamp for when the person was detected in a video. An array of
 *         <code>PersonMatch</code> objects is returned by <a>GetFaceSearch</a>. </p>
 */
export interface PersonMatch {
    /**
     * <p>The time, in milliseconds from the beginning of the video, that the person was matched in the video.</p>
     */
    Timestamp?: number;
    /**
     * <p>Information about the matched person.</p>
     */
    Person?: PersonDetail;
    /**
     * <p>Information about the faces in the input collection that match the face of a person in the video.</p>
     */
    FaceMatches?: FaceMatch[];
}
export declare namespace PersonMatch {
    const filterSensitiveLog: (obj: PersonMatch) => any;
}
export interface GetFaceSearchResponse {
    /**
     * <p>The current status of the face search job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent request to retrieve the next set of search results. </p>
     */
    NextToken?: string;
    /**
     * <p>Information about a video that Amazon Rekognition analyzed. <code>Videometadata</code> is returned in every page of paginated responses
     *       from a Amazon Rekognition Video operation. </p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>An array of persons,  <a>PersonMatch</a>,
     *       in the video whose face(s) match the face(s) in an Amazon Rekognition collection. It also includes time information
     *        for when persons are matched in the video.
     *       You specify the input collection in an initial call to <code>StartFaceSearch</code>.
     *       Each  <code>Persons</code> element includes a time the person was matched,
     *       face match details (<code>FaceMatches</code>) for matching faces in the collection,
     *        and person information (<code>Person</code>) for the matched person. </p>
     */
    Persons?: PersonMatch[];
}
export declare namespace GetFaceSearchResponse {
    const filterSensitiveLog: (obj: GetFaceSearchResponse) => any;
}
export declare enum LabelDetectionSortBy {
    NAME = "NAME",
    TIMESTAMP = "TIMESTAMP"
}
export interface GetLabelDetectionRequest {
    /**
     * <p>Job identifier for the label detection operation for which you want results returned. You get the job identifer from
     *       an initial call to <code>StartlabelDetection</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.
     *        If you specify a value greater than 1000, a maximum of 1000 results is returned.
     *        The default value is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there are more labels to retrieve), Amazon Rekognition Video returns a pagination
     *          token in the response. You can use this pagination token to retrieve the next set of labels. </p>
     */
    NextToken?: string;
    /**
     * <p>Sort to use for elements in the <code>Labels</code> array.
     *       Use <code>TIMESTAMP</code> to sort array elements by the time labels are detected.
     *       Use <code>NAME</code> to alphabetically group elements for a label together.
     *       Within each label group, the array element are sorted by detection confidence.
     *       The default sort is by <code>TIMESTAMP</code>.</p>
     */
    SortBy?: LabelDetectionSortBy | string;
}
export declare namespace GetLabelDetectionRequest {
    const filterSensitiveLog: (obj: GetLabelDetectionRequest) => any;
}
/**
 * <p>Information about a label detected in a video analysis request and the time the label was detected in the video. </p>
 */
export interface LabelDetection {
    /**
     * <p>Time, in milliseconds from the start of the video, that the label was detected.</p>
     */
    Timestamp?: number;
    /**
     * <p>Details about the detected label.</p>
     */
    Label?: Label;
}
export declare namespace LabelDetection {
    const filterSensitiveLog: (obj: LabelDetection) => any;
}
export interface GetLabelDetectionResponse {
    /**
     * <p>The current status of the label detection job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Information about a video that Amazon Rekognition Video analyzed. <code>Videometadata</code> is returned in
     *        every page of paginated responses from a Amazon Rekognition video operation.</p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent request
     *         to retrieve the next set of labels.</p>
     */
    NextToken?: string;
    /**
     * <p>An array of labels detected in the video. Each element contains the detected label and the time,
     *         in milliseconds from the start of the video, that the label was detected. </p>
     */
    Labels?: LabelDetection[];
    /**
     * <p>Version number of the label detection model that was used to detect labels.</p>
     */
    LabelModelVersion?: string;
}
export declare namespace GetLabelDetectionResponse {
    const filterSensitiveLog: (obj: GetLabelDetectionResponse) => any;
}
export declare enum PersonTrackingSortBy {
    INDEX = "INDEX",
    TIMESTAMP = "TIMESTAMP"
}
export interface GetPersonTrackingRequest {
    /**
     * <p>The identifier for a job that tracks persons in a video. You get the <code>JobId</code> from a call to <code>StartPersonTracking</code>.
     *         </p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.
     *       If you specify a value greater than 1000, a maximum of 1000 results is returned.
     *       The default value is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there are more persons to retrieve), Amazon Rekognition Video returns a pagination
     *        token in the response. You can use this pagination token to retrieve the next set of persons. </p>
     */
    NextToken?: string;
    /**
     * <p>Sort to use for elements in the <code>Persons</code> array. Use <code>TIMESTAMP</code> to sort array elements
     *        by the time persons are detected. Use <code>INDEX</code> to sort by the tracked persons.
     *        If you sort by <code>INDEX</code>, the array elements for each person are sorted by detection confidence.
     *        The default sort is by <code>TIMESTAMP</code>.</p>
     */
    SortBy?: PersonTrackingSortBy | string;
}
export declare namespace GetPersonTrackingRequest {
    const filterSensitiveLog: (obj: GetPersonTrackingRequest) => any;
}
/**
 * <p>Details and path tracking information for a single time a person's path is tracked in a video.
 *             Amazon Rekognition operations that track people's paths return an array of <code>PersonDetection</code> objects
 *             with elements for each time a person's path is tracked in a video. </p>
 *
 *          <p>For more information, see GetPersonTracking in the Amazon Rekognition Developer Guide. </p>
 */
export interface PersonDetection {
    /**
     * <p>The time, in milliseconds from the start of the video, that the person's path was tracked.</p>
     */
    Timestamp?: number;
    /**
     * <p>Details about a person whose path was tracked in a video.</p>
     */
    Person?: PersonDetail;
}
export declare namespace PersonDetection {
    const filterSensitiveLog: (obj: PersonDetection) => any;
}
export interface GetPersonTrackingResponse {
    /**
     * <p>The current status of the person tracking job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Information about a video that Amazon Rekognition Video analyzed. <code>Videometadata</code> is returned in
     *        every page of paginated responses from a Amazon Rekognition Video operation.</p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent request to retrieve the next set of persons. </p>
     */
    NextToken?: string;
    /**
     * <p>An array of the persons detected in the video and the time(s) their path was tracked throughout the video.
     *         An array element will exist for each time a person's path is tracked. </p>
     */
    Persons?: PersonDetection[];
}
export declare namespace GetPersonTrackingResponse {
    const filterSensitiveLog: (obj: GetPersonTrackingResponse) => any;
}
export interface GetSegmentDetectionRequest {
    /**
     * <p>Job identifier for the text detection operation for which you want results returned.
     *       You get the job identifer from an initial call to <code>StartSegmentDetection</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent
     *       request to retrieve the next set of text.</p>
     */
    NextToken?: string;
}
export declare namespace GetSegmentDetectionRequest {
    const filterSensitiveLog: (obj: GetSegmentDetectionRequest) => any;
}
/**
 * <p>Information about a shot detection segment detected in a video. For more information,
 *       see <a>SegmentDetection</a>.</p>
 */
export interface ShotSegment {
    /**
     * <p>An Identifier for a shot detection segment detected in a video. </p>
     */
    Index?: number;
    /**
     * <p>The confidence that Amazon Rekognition Video has in the accuracy of the detected segment.</p>
     */
    Confidence?: number;
}
export declare namespace ShotSegment {
    const filterSensitiveLog: (obj: ShotSegment) => any;
}
export declare enum TechnicalCueType {
    BLACK_FRAMES = "BlackFrames",
    COLOR_BARS = "ColorBars",
    END_CREDITS = "EndCredits"
}
/**
 * <p>Information about a technical cue segment. For more information, see <a>SegmentDetection</a>.</p>
 */
export interface TechnicalCueSegment {
    /**
     * <p>The type of the technical cue.</p>
     */
    Type?: TechnicalCueType | string;
    /**
     * <p>The confidence that Amazon Rekognition Video has in the accuracy of the detected segment.</p>
     */
    Confidence?: number;
}
export declare namespace TechnicalCueSegment {
    const filterSensitiveLog: (obj: TechnicalCueSegment) => any;
}
export declare enum SegmentType {
    SHOT = "SHOT",
    TECHNICAL_CUE = "TECHNICAL_CUE"
}
/**
 * <p>A technical cue or shot detection segment detected in a video. An array
 *     of <code>SegmentDetection</code> objects containing all segments detected in a stored video
 *       is returned by <a>GetSegmentDetection</a>.
 *     </p>
 */
export interface SegmentDetection {
    /**
     * <p>The type of the  segment. Valid values are <code>TECHNICAL_CUE</code> and <code>SHOT</code>.</p>
     */
    Type?: SegmentType | string;
    /**
     * <p>The start time of the detected segment in milliseconds from the start of the video. This value
     *       is rounded down. For example, if the actual timestamp is 100.6667 milliseconds, Amazon Rekognition Video returns a value of
     *       100 millis.</p>
     */
    StartTimestampMillis?: number;
    /**
     * <p>The end time of the detected segment, in milliseconds, from the start of the video.
     *     This value is rounded down.</p>
     */
    EndTimestampMillis?: number;
    /**
     * <p>The duration of the detected segment in milliseconds. </p>
     */
    DurationMillis?: number;
    /**
     * <p>The frame-accurate SMPTE timecode, from the start of a video, for the start of a detected segment.
     *       <code>StartTimecode</code> is in <i>HH:MM:SS:fr</i> format
     *       (and <i>;fr</i> for drop frame-rates). </p>
     */
    StartTimecodeSMPTE?: string;
    /**
     * <p>The frame-accurate SMPTE timecode, from the start of a video, for the end of a detected segment.
     *       <code>EndTimecode</code> is in <i>HH:MM:SS:fr</i> format
     *       (and <i>;fr</i> for drop frame-rates).</p>
     */
    EndTimecodeSMPTE?: string;
    /**
     * <p>The duration of the timecode for the detected segment in SMPTE format.</p>
     */
    DurationSMPTE?: string;
    /**
     * <p>If the segment is a technical cue, contains information about the technical cue.</p>
     */
    TechnicalCueSegment?: TechnicalCueSegment;
    /**
     * <p>If the segment is a shot detection, contains information about the shot detection.</p>
     */
    ShotSegment?: ShotSegment;
}
export declare namespace SegmentDetection {
    const filterSensitiveLog: (obj: SegmentDetection) => any;
}
/**
 * <p>Information about the type of a segment requested in a call to <a>StartSegmentDetection</a>.
 *       An array of <code>SegmentTypeInfo</code> objects is returned  by the response from <a>GetSegmentDetection</a>.</p>
 */
export interface SegmentTypeInfo {
    /**
     * <p>The type of a segment (technical cue or shot detection).</p>
     */
    Type?: SegmentType | string;
    /**
     * <p>The version of the model used to detect segments.</p>
     */
    ModelVersion?: string;
}
export declare namespace SegmentTypeInfo {
    const filterSensitiveLog: (obj: SegmentTypeInfo) => any;
}
export interface GetSegmentDetectionResponse {
    /**
     * <p>Current status of the segment detection job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Currently, Amazon Rekognition Video returns a single   object in the
     *       <code>VideoMetadata</code> array. The object
     *       contains information about the video stream in the input file that Amazon Rekognition Video chose to analyze.
     *       The <code>VideoMetadata</code> object includes the video codec, video format and other information.
     *       Video metadata is returned in each page of information returned by <code>GetSegmentDetection</code>.</p>
     */
    VideoMetadata?: VideoMetadata[];
    /**
     * <p>An array of
     *        objects. There can be multiple audio streams.
     *       Each <code>AudioMetadata</code> object contains metadata for a single audio stream.
     *       Audio information in an <code>AudioMetadata</code> objects includes
     *       the audio codec, the number of audio channels, the duration of the audio stream,
     *       and the sample rate. Audio metadata is returned in each page of information returned
     *       by <code>GetSegmentDetection</code>.</p>
     */
    AudioMetadata?: AudioMetadata[];
    /**
     * <p>If the previous response was incomplete (because there are more labels to retrieve), Amazon Rekognition Video returns
     *       a pagination token in the response. You can use this pagination token to retrieve the next set of text.</p>
     */
    NextToken?: string;
    /**
     * <p>An array of segments detected in a video.  The array is sorted by the segment types (TECHNICAL_CUE or SHOT)
     *       specified in the <code>SegmentTypes</code> input parameter of <code>StartSegmentDetection</code>. Within
     *       each segment type the array is sorted by timestamp values.</p>
     */
    Segments?: SegmentDetection[];
    /**
     * <p>An array containing the segment types requested in the call to <code>StartSegmentDetection</code>.
     *     </p>
     */
    SelectedSegmentTypes?: SegmentTypeInfo[];
}
export declare namespace GetSegmentDetectionResponse {
    const filterSensitiveLog: (obj: GetSegmentDetectionResponse) => any;
}
export interface GetTextDetectionRequest {
    /**
     * <p>Job identifier for the text detection operation for which you want results returned.
     *         You get the job identifer from an initial call to <code>StartTextDetection</code>.</p>
     */
    JobId: string | undefined;
    /**
     * <p>Maximum number of results to return per paginated call. The largest value you can specify is 1000.</p>
     */
    MaxResults?: number;
    /**
     * <p>If the previous response was incomplete (because there are more labels to retrieve), Amazon Rekognition Video returns
     *       a pagination token in the response. You can use this pagination token to retrieve the next set of text.</p>
     */
    NextToken?: string;
}
export declare namespace GetTextDetectionRequest {
    const filterSensitiveLog: (obj: GetTextDetectionRequest) => any;
}
/**
 * <p>Information about text detected in a video. Incudes the detected text,
 *         the time in milliseconds from the start of the video that the text was detected, and where it was detected on the screen.</p>
 */
export interface TextDetectionResult {
    /**
     * <p>The time, in milliseconds from the start of the video, that the text was detected.</p>
     */
    Timestamp?: number;
    /**
     * <p>Details about text detected in a video.</p>
     */
    TextDetection?: TextDetection;
}
export declare namespace TextDetectionResult {
    const filterSensitiveLog: (obj: TextDetectionResult) => any;
}
export interface GetTextDetectionResponse {
    /**
     * <p>Current status of the text detection job.</p>
     */
    JobStatus?: VideoJobStatus | string;
    /**
     * <p>If the job fails, <code>StatusMessage</code> provides a descriptive error message.</p>
     */
    StatusMessage?: string;
    /**
     * <p>Information about a video that Amazon Rekognition analyzed. <code>Videometadata</code> is returned in
     *             every page of paginated responses from a Amazon Rekognition video operation.</p>
     */
    VideoMetadata?: VideoMetadata;
    /**
     * <p>An array of text detected in the video. Each element contains the detected text, the time in milliseconds
     *       from the start of the video that the text was detected, and where it was detected on the screen.</p>
     */
    TextDetections?: TextDetectionResult[];
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent
     *         request to retrieve the next set of text.</p>
     */
    NextToken?: string;
    /**
     * <p>Version number of the text detection model that was used to detect text.</p>
     */
    TextModelVersion?: string;
}
export declare namespace GetTextDetectionResponse {
    const filterSensitiveLog: (obj: GetTextDetectionResponse) => any;
}
/**
 * <p>A <code>ClientRequestToken</code> input parameter was reused with an operation, but at least one of the other input
 *         parameters is different from the previous call to the operation.</p>
 */
export interface IdempotentParameterMismatchException extends __SmithyException, $MetadataBearer {
    name: "IdempotentParameterMismatchException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace IdempotentParameterMismatchException {
    const filterSensitiveLog: (obj: IdempotentParameterMismatchException) => any;
}
export interface IndexFacesRequest {
    /**
     * <p>The ID of an existing collection to which you want to add the faces that are detected
     *       in the input images.</p>
     */
    CollectionId: string | undefined;
    /**
     * <p>The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call
     *       Amazon Rekognition operations, passing base64-encoded image bytes isn't supported. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
    /**
     * <p>The ID you want to assign to all the faces detected in the image.</p>
     */
    ExternalImageId?: string;
    /**
     * <p>An array of facial attributes that you want to be returned. This can be the default
     *       list of attributes or all attributes. If you don't specify a value for <code>Attributes</code>
     *       or if you specify <code>["DEFAULT"]</code>, the API returns the following subset of facial
     *       attributes: <code>BoundingBox</code>, <code>Confidence</code>, <code>Pose</code>,
     *         <code>Quality</code>, and <code>Landmarks</code>. If you provide <code>["ALL"]</code>, all
     *       facial attributes are returned, but the operation takes longer to complete.</p>
     *          <p>If you provide both, <code>["ALL", "DEFAULT"]</code>, the service uses a logical AND
     *       operator to determine which attributes to return (in this case, all attributes). </p>
     */
    DetectionAttributes?: (Attribute | string)[];
    /**
     * <p>The maximum number of faces to index. The value of <code>MaxFaces</code> must be greater
     *       than or equal to 1. <code>IndexFaces</code> returns no more than 100 detected faces in an
     *       image, even if you specify a larger value for <code>MaxFaces</code>.</p>
     *          <p>If <code>IndexFaces</code> detects more faces than the value of <code>MaxFaces</code>, the
     *       faces with the lowest quality are filtered out first. If there are still more faces than the
     *       value of <code>MaxFaces</code>, the faces with the smallest bounding boxes are filtered out
     *       (up to the number that's needed to satisfy the value of <code>MaxFaces</code>). Information
     *       about the unindexed faces is available in the <code>UnindexedFaces</code> array. </p>
     *          <p>The faces that are returned by <code>IndexFaces</code> are sorted by the largest face
     *       bounding box size to the smallest size, in descending order.</p>
     *          <p>
     *             <code>MaxFaces</code> can be used with a collection associated with any version of
     *       the face model.</p>
     */
    MaxFaces?: number;
    /**
     * <p>A filter that specifies a quality bar for how much filtering is done to identify faces.
     *     Filtered faces aren't indexed. If you specify <code>AUTO</code>, Amazon Rekognition chooses the quality bar.
     *       If you specify <code>LOW</code>,
     *       <code>MEDIUM</code>, or <code>HIGH</code>, filtering removes all faces that
     *       don’t meet the chosen quality bar.  The default value is <code>AUTO</code>.
     *
     *       The quality bar is based on a variety of common use cases. Low-quality
     *       detections can occur for a number of reasons. Some examples are an object that's misidentified
     *       as a face, a face that's too blurry, or a face with a
     *       pose that's too extreme to use. If you specify <code>NONE</code>, no
     *       filtering is performed.
     *     </p>
     *          <p>To use quality filtering, the collection you are using must be associated with version 3 of the face model or higher.</p>
     */
    QualityFilter?: QualityFilter | string;
}
export declare namespace IndexFacesRequest {
    const filterSensitiveLog: (obj: IndexFacesRequest) => any;
}
export declare enum Reason {
    EXCEEDS_MAX_FACES = "EXCEEDS_MAX_FACES",
    EXTREME_POSE = "EXTREME_POSE",
    LOW_BRIGHTNESS = "LOW_BRIGHTNESS",
    LOW_CONFIDENCE = "LOW_CONFIDENCE",
    LOW_FACE_QUALITY = "LOW_FACE_QUALITY",
    LOW_SHARPNESS = "LOW_SHARPNESS",
    SMALL_BOUNDING_BOX = "SMALL_BOUNDING_BOX"
}
/**
 * <p>A face that <a>IndexFaces</a> detected, but didn't index. Use the
 *         <code>Reasons</code> response attribute to determine why a face wasn't indexed.</p>
 */
export interface UnindexedFace {
    /**
     * <p>An array of reasons that specify why a face wasn't indexed. </p>
     *          <ul>
     *             <li>
     *                <p>EXTREME_POSE - The face is at a pose that can't be detected. For example, the head is turned
     *           too far away from the camera.</p>
     *             </li>
     *             <li>
     *                <p>EXCEEDS_MAX_FACES - The number of faces detected is already higher than that specified by the
     *       <code>MaxFaces</code> input parameter for <code>IndexFaces</code>.</p>
     *             </li>
     *             <li>
     *                <p>LOW_BRIGHTNESS - The image is too dark.</p>
     *             </li>
     *             <li>
     *                <p>LOW_SHARPNESS - The image is too blurry.</p>
     *             </li>
     *             <li>
     *                <p>LOW_CONFIDENCE - The face was detected with a low confidence.</p>
     *             </li>
     *             <li>
     *                <p>SMALL_BOUNDING_BOX - The bounding box around the face is too small.</p>
     *             </li>
     *          </ul>
     */
    Reasons?: (Reason | string)[];
    /**
     * <p>The
     *       structure that contains attributes of a face that
     *       <code>IndexFaces</code>detected, but didn't index. </p>
     */
    FaceDetail?: FaceDetail;
}
export declare namespace UnindexedFace {
    const filterSensitiveLog: (obj: UnindexedFace) => any;
}
export interface IndexFacesResponse {
    /**
     * <p>An array of faces detected and added to the collection.
     *       For more information, see Searching Faces in a Collection in the Amazon Rekognition Developer Guide.
     *     </p>
     */
    FaceRecords?: FaceRecord[];
    /**
     * <p>If your collection is associated with a face detection model that's later
     *       than version 3.0, the value of <code>OrientationCorrection</code>
     *       is always null and no orientation information is returned.</p>
     *
     *          <p>If your collection is associated with a face detection model that's
     *       version 3.0 or earlier, the following applies:</p>
     *          <ul>
     *             <li>
     *                <p>If the input image is in .jpeg format, it might contain exchangeable image file format (Exif) metadata
     *         that includes the image's orientation. Amazon Rekognition uses this orientation information to perform
     *         image correction - the bounding box coordinates are translated to represent object locations
     *         after the orientation information in the Exif metadata is used to correct the image orientation.
     *         Images in .png format don't contain Exif metadata. The value of <code>OrientationCorrection</code>
     *         is null.</p>
     *             </li>
     *             <li>
     *                <p>If the image doesn't contain orientation information in its Exif metadata, Amazon Rekognition returns
     *       an estimated orientation (ROTATE_0, ROTATE_90, ROTATE_180, ROTATE_270). Amazon Rekognition doesn’t perform
     *       image correction for images. The bounding box coordinates aren't translated and represent the
     *       object locations before the image is rotated.</p>
     *             </li>
     *          </ul>
     *
     *
     *
     *          <p>Bounding box information is returned in the <code>FaceRecords</code> array. You can get the
     *     version of the face detection model by calling <a>DescribeCollection</a>. </p>
     */
    OrientationCorrection?: OrientationCorrection | string;
    /**
     * <p>The version number of the face detection model that's associated with the input
     *       collection (<code>CollectionId</code>).</p>
     */
    FaceModelVersion?: string;
    /**
     * <p>An array of faces that were detected in the image but weren't indexed. They weren't
     *       indexed because the quality filter identified them as low quality, or the
     *         <code>MaxFaces</code> request parameter filtered them out. To use the quality filter, you
     *       specify the <code>QualityFilter</code> request parameter.</p>
     */
    UnindexedFaces?: UnindexedFace[];
}
export declare namespace IndexFacesResponse {
    const filterSensitiveLog: (obj: IndexFacesResponse) => any;
}
/**
 * <p></p>
 *
 *
 *          <p>The size of the collection exceeds the allowed limit. For more information, see
 *       Limits in Amazon Rekognition in the Amazon Rekognition Developer Guide. </p>
 */
export interface ServiceQuotaExceededException extends __SmithyException, $MetadataBearer {
    name: "ServiceQuotaExceededException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace ServiceQuotaExceededException {
    const filterSensitiveLog: (obj: ServiceQuotaExceededException) => any;
}
export interface ListCollectionsRequest {
    /**
     * <p>Pagination token from the previous response.</p>
     */
    NextToken?: string;
    /**
     * <p>Maximum number of collection IDs to return. </p>
     */
    MaxResults?: number;
}
export declare namespace ListCollectionsRequest {
    const filterSensitiveLog: (obj: ListCollectionsRequest) => any;
}
export interface ListCollectionsResponse {
    /**
     * <p>An array of collection IDs.</p>
     */
    CollectionIds?: string[];
    /**
     * <p>If the result is truncated, the response provides a <code>NextToken</code> that you can
     *       use in the subsequent request to fetch the next set of collection IDs.</p>
     */
    NextToken?: string;
    /**
     * <p>Version numbers of the face detection models associated with the collections in the array <code>CollectionIds</code>.
     *     For example, the value of <code>FaceModelVersions[2]</code> is the version number for the face detection model used
     *       by the collection in <code>CollectionId[2]</code>.</p>
     */
    FaceModelVersions?: string[];
}
export declare namespace ListCollectionsResponse {
    const filterSensitiveLog: (obj: ListCollectionsResponse) => any;
}
export interface ListFacesRequest {
    /**
     * <p>ID of the collection from which to list the faces.</p>
     */
    CollectionId: string | undefined;
    /**
     * <p>If the previous response was incomplete (because there is more data to retrieve),
     *       Amazon Rekognition returns a pagination token in the response. You can use this pagination token to
     *       retrieve the next set of faces.</p>
     */
    NextToken?: string;
    /**
     * <p>Maximum number of faces to return.</p>
     */
    MaxResults?: number;
}
export declare namespace ListFacesRequest {
    const filterSensitiveLog: (obj: ListFacesRequest) => any;
}
export interface ListFacesResponse {
    /**
     * <p>An array of <code>Face</code> objects. </p>
     */
    Faces?: Face[];
    /**
     * <p>If the response is truncated, Amazon Rekognition returns this token that you can use in the
     *       subsequent request to retrieve the next set of faces.</p>
     */
    NextToken?: string;
    /**
     * <p>Version number of the face detection model associated with the input collection (<code>CollectionId</code>).</p>
     */
    FaceModelVersion?: string;
}
export declare namespace ListFacesResponse {
    const filterSensitiveLog: (obj: ListFacesResponse) => any;
}
export interface ListStreamProcessorsRequest {
    /**
     * <p>If the previous response was incomplete (because there are more stream processors to retrieve), Amazon Rekognition Video
     *             returns a pagination token in the response. You can use this pagination token to retrieve the next set of stream processors. </p>
     */
    NextToken?: string;
    /**
     * <p>Maximum number of stream processors you want Amazon Rekognition Video to return in the response. The default is 1000. </p>
     */
    MaxResults?: number;
}
export declare namespace ListStreamProcessorsRequest {
    const filterSensitiveLog: (obj: ListStreamProcessorsRequest) => any;
}
/**
 * <p>An object that recognizes faces in a streaming video. An Amazon Rekognition stream processor is created by a call to <a>CreateStreamProcessor</a>.  The request
 *         parameters for <code>CreateStreamProcessor</code> describe the Kinesis video stream source for the streaming video, face recognition parameters, and where to stream the analysis resullts.
 *
 *         </p>
 */
export interface StreamProcessor {
    /**
     * <p>Name of the Amazon Rekognition stream processor. </p>
     */
    Name?: string;
    /**
     * <p>Current status of the Amazon Rekognition stream processor.</p>
     */
    Status?: StreamProcessorStatus | string;
}
export declare namespace StreamProcessor {
    const filterSensitiveLog: (obj: StreamProcessor) => any;
}
export interface ListStreamProcessorsResponse {
    /**
     * <p>If the response is truncated, Amazon Rekognition Video returns this token that you can use in the subsequent
     *             request to retrieve the next set of stream processors. </p>
     */
    NextToken?: string;
    /**
     * <p>List of stream processors that you have created.</p>
     */
    StreamProcessors?: StreamProcessor[];
}
export declare namespace ListStreamProcessorsResponse {
    const filterSensitiveLog: (obj: ListStreamProcessorsResponse) => any;
}
/**
 * <p>The Amazon Simple Notification Service topic to which Amazon Rekognition publishes the completion status of a video analysis operation. For more information, see
 *             <a>api-video</a>.</p>
 */
export interface NotificationChannel {
    /**
     * <p>The Amazon SNS topic to which Amazon Rekognition to posts the completion status.</p>
     */
    SNSTopicArn: string | undefined;
    /**
     * <p>The ARN of an IAM role that gives Amazon Rekognition publishing permissions to the Amazon SNS topic. </p>
     */
    RoleArn: string | undefined;
}
export declare namespace NotificationChannel {
    const filterSensitiveLog: (obj: NotificationChannel) => any;
}
export interface RecognizeCelebritiesRequest {
    /**
     * <p>The input image as base64-encoded bytes or an S3 object. If you use the AWS CLI to call
     *       Amazon Rekognition operations, passing base64-encoded image bytes is not supported. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
}
export declare namespace RecognizeCelebritiesRequest {
    const filterSensitiveLog: (obj: RecognizeCelebritiesRequest) => any;
}
export interface RecognizeCelebritiesResponse {
    /**
     * <p>Details about each celebrity found in the image. Amazon Rekognition can detect a maximum of 64
     *       celebrities in an image.</p>
     */
    CelebrityFaces?: Celebrity[];
    /**
     * <p>Details about each unrecognized face in the image.</p>
     */
    UnrecognizedFaces?: ComparedFace[];
    /**
     * <p>The orientation of the input image (counterclockwise direction). If your application
     *       displays the image, you can use this value to correct the orientation. The bounding box
     *       coordinates returned in <code>CelebrityFaces</code> and <code>UnrecognizedFaces</code>
     *       represent face locations before the image orientation is corrected. </p>
     *          <note>
     *             <p>If the input image is in .jpeg format, it might contain exchangeable image (Exif)
     *         metadata that includes the image's orientation. If so, and the Exif metadata for the input
     *         image populates the orientation field, the value of <code>OrientationCorrection</code> is
     *         null. The <code>CelebrityFaces</code> and <code>UnrecognizedFaces</code> bounding box
     *         coordinates represent face locations after Exif metadata is used to correct the image
     *         orientation. Images in .png format don't contain Exif metadata. </p>
     *          </note>
     */
    OrientationCorrection?: OrientationCorrection | string;
}
export declare namespace RecognizeCelebritiesResponse {
    const filterSensitiveLog: (obj: RecognizeCelebritiesResponse) => any;
}
export interface SearchFacesRequest {
    /**
     * <p>ID of the collection the face belongs to.</p>
     */
    CollectionId: string | undefined;
    /**
     * <p>ID of a face to find matches for in the collection.</p>
     */
    FaceId: string | undefined;
    /**
     * <p>Maximum number of faces to return. The operation returns the maximum number of faces
     *       with the highest confidence in the match.</p>
     */
    MaxFaces?: number;
    /**
     * <p>Optional value specifying the minimum confidence in the face match to return. For
     *       example, don't return any matches where confidence in matches is less than 70%.
     *       The default value is 80%.
     *     </p>
     */
    FaceMatchThreshold?: number;
}
export declare namespace SearchFacesRequest {
    const filterSensitiveLog: (obj: SearchFacesRequest) => any;
}
export interface SearchFacesResponse {
    /**
     * <p>ID of the face that was searched for matches in a collection.</p>
     */
    SearchedFaceId?: string;
    /**
     * <p>An array of faces that matched the input face, along with the confidence in the
     *       match.</p>
     */
    FaceMatches?: FaceMatch[];
    /**
     * <p>Version number of the face detection model associated with the input collection (<code>CollectionId</code>).</p>
     */
    FaceModelVersion?: string;
}
export declare namespace SearchFacesResponse {
    const filterSensitiveLog: (obj: SearchFacesResponse) => any;
}
export interface SearchFacesByImageRequest {
    /**
     * <p>ID of the collection to search.</p>
     */
    CollectionId: string | undefined;
    /**
     * <p>The input image as base64-encoded bytes or an S3 object.
     *       If you use the AWS CLI to call Amazon Rekognition operations,
     *       passing base64-encoded image bytes is not supported. </p>
     *          <p>If you are using an AWS SDK to call Amazon Rekognition, you might not need to base64-encode image bytes
     *       passed using the <code>Bytes</code> field.
     *       For more information, see Images in the Amazon Rekognition developer guide.</p>
     */
    Image: Image | undefined;
    /**
     * <p>Maximum number of faces to return. The operation returns the maximum number of faces
     *       with the highest confidence in the match.</p>
     */
    MaxFaces?: number;
    /**
     * <p>(Optional) Specifies the minimum confidence in the face match to return. For example,
     *       don't return any matches where confidence in matches is less than 70%.
     *     The default value is 80%.</p>
     */
    FaceMatchThreshold?: number;
    /**
     * <p>A filter that specifies a quality bar for how much filtering is done to identify faces.
     *       Filtered faces aren't searched for in the collection. If you specify <code>AUTO</code>, Amazon Rekognition
     *       chooses the quality bar.  If you specify <code>LOW</code>,
     *       <code>MEDIUM</code>, or <code>HIGH</code>, filtering removes all faces that
     *       don’t meet the chosen quality bar.
     *
     *       The quality bar is based on a variety of common use cases. Low-quality
     *       detections can occur for a number of reasons. Some examples are an object that's misidentified
     *       as a face, a face that's too blurry, or a face with a
     *       pose that's too extreme to use. If you specify <code>NONE</code>, no
     *       filtering is performed.  The default value is <code>NONE</code>.
     *     </p>
     *          <p>To use quality filtering, the collection you are using must be associated with version 3 of the face model or higher.</p>
     */
    QualityFilter?: QualityFilter | string;
}
export declare namespace SearchFacesByImageRequest {
    const filterSensitiveLog: (obj: SearchFacesByImageRequest) => any;
}
export interface SearchFacesByImageResponse {
    /**
     * <p>The bounding box around the face in the input image that Amazon Rekognition used for the
     *       search.</p>
     */
    SearchedFaceBoundingBox?: BoundingBox;
    /**
     * <p>The level of confidence that the <code>searchedFaceBoundingBox</code>, contains a
     *       face.</p>
     */
    SearchedFaceConfidence?: number;
    /**
     * <p>An array of faces that match the input face, along with the confidence in the
     *       match.</p>
     */
    FaceMatches?: FaceMatch[];
    /**
     * <p>Version number of the face detection model associated with the input collection (<code>CollectionId</code>).</p>
     */
    FaceModelVersion?: string;
}
export declare namespace SearchFacesByImageResponse {
    const filterSensitiveLog: (obj: SearchFacesByImageResponse) => any;
}
/**
 * <p>Video file stored in an Amazon S3 bucket. Amazon Rekognition video start operations such as <a>StartLabelDetection</a> use <code>Video</code> to
 *             specify a video for analysis. The supported file formats are .mp4, .mov and .avi.</p>
 */
export interface Video {
    /**
     * <p>The Amazon S3 bucket name and file name for the video.</p>
     */
    S3Object?: S3Object;
}
export declare namespace Video {
    const filterSensitiveLog: (obj: Video) => any;
}
export interface StartCelebrityRecognitionRequest {
    /**
     * <p>The video in which you want to recognize celebrities. The video must be stored
     *       in an Amazon S3 bucket.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *     <code>StartCelebrityRecognition</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The Amazon SNS topic ARN that you want Amazon Rekognition Video to publish the completion status of the
     *       celebrity recognition analysis to.</p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
}
export declare namespace StartCelebrityRecognitionRequest {
    const filterSensitiveLog: (obj: StartCelebrityRecognitionRequest) => any;
}
export interface StartCelebrityRecognitionResponse {
    /**
     * <p>The identifier for the celebrity recognition analysis job. Use <code>JobId</code> to identify the job in
     *       a subsequent call to <code>GetCelebrityRecognition</code>.</p>
     */
    JobId?: string;
}
export declare namespace StartCelebrityRecognitionResponse {
    const filterSensitiveLog: (obj: StartCelebrityRecognitionResponse) => any;
}
/**
 * <p>The file size or duration of the supplied media is too large. The maximum file size is 10GB.
 *         The maximum duration is 6 hours. </p>
 */
export interface VideoTooLargeException extends __SmithyException, $MetadataBearer {
    name: "VideoTooLargeException";
    $fault: "client";
    Message?: string;
    Code?: string;
    /**
     * <p>A universally unique identifier (UUID) for the request.</p>
     */
    Logref?: string;
}
export declare namespace VideoTooLargeException {
    const filterSensitiveLog: (obj: VideoTooLargeException) => any;
}
export interface StartContentModerationRequest {
    /**
     * <p>The video in which you want to detect unsafe content. The video must be stored
     *       in an Amazon S3 bucket.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Specifies the minimum confidence that Amazon Rekognition must have in order to return a moderated content label. Confidence
     *       represents how certain Amazon Rekognition is that the moderated content is correctly identified. 0 is the lowest confidence.
     *       100 is the highest confidence.  Amazon Rekognition doesn't return any moderated content labels with a confidence level
     *       lower than this specified value. If you don't specify <code>MinConfidence</code>, <code>GetContentModeration</code>
     *        returns labels with confidence values greater than or equal to 50 percent.</p>
     */
    MinConfidence?: number;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *       <code>StartContentModeration</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The Amazon SNS topic ARN that you want Amazon Rekognition Video to publish the completion status of the
     *       unsafe content analysis to.</p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
}
export declare namespace StartContentModerationRequest {
    const filterSensitiveLog: (obj: StartContentModerationRequest) => any;
}
export interface StartContentModerationResponse {
    /**
     * <p>The identifier for the unsafe content analysis job. Use <code>JobId</code> to identify the job in
     *       a subsequent call to <code>GetContentModeration</code>.</p>
     */
    JobId?: string;
}
export declare namespace StartContentModerationResponse {
    const filterSensitiveLog: (obj: StartContentModerationResponse) => any;
}
export interface StartFaceDetectionRequest {
    /**
     * <p>The video in which you want to detect faces. The video must be stored
     *       in an Amazon S3 bucket.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *       <code>StartFaceDetection</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The ARN of the Amazon SNS topic to which you want Amazon Rekognition Video to publish the completion status of the
     *          face detection operation.</p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>The face attributes you want returned.</p>
     *          <p>
     *             <code>DEFAULT</code> - The following subset of facial attributes are returned: BoundingBox, Confidence, Pose, Quality and Landmarks. </p>
     *          <p>
     *             <code>ALL</code> - All facial attributes are returned.</p>
     */
    FaceAttributes?: FaceAttributes | string;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
}
export declare namespace StartFaceDetectionRequest {
    const filterSensitiveLog: (obj: StartFaceDetectionRequest) => any;
}
export interface StartFaceDetectionResponse {
    /**
     * <p>The identifier for the face detection job. Use <code>JobId</code> to identify the job in
     *     a subsequent call to <code>GetFaceDetection</code>.</p>
     */
    JobId?: string;
}
export declare namespace StartFaceDetectionResponse {
    const filterSensitiveLog: (obj: StartFaceDetectionResponse) => any;
}
export interface StartFaceSearchRequest {
    /**
     * <p>The video you want to search. The video must be stored in an Amazon S3 bucket. </p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *       <code>StartFaceSearch</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The minimum confidence in the person match to return. For example, don't return any matches where confidence in matches is less than 70%.
     *       The default value is 80%.</p>
     */
    FaceMatchThreshold?: number;
    /**
     * <p>ID of the collection that contains the faces you want to search for.</p>
     */
    CollectionId: string | undefined;
    /**
     * <p>The ARN of the Amazon SNS topic to which you want Amazon Rekognition Video to publish the completion status of the search. </p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
}
export declare namespace StartFaceSearchRequest {
    const filterSensitiveLog: (obj: StartFaceSearchRequest) => any;
}
export interface StartFaceSearchResponse {
    /**
     * <p>The identifier for the search job. Use <code>JobId</code> to identify the job in a subsequent call to <code>GetFaceSearch</code>. </p>
     */
    JobId?: string;
}
export declare namespace StartFaceSearchResponse {
    const filterSensitiveLog: (obj: StartFaceSearchResponse) => any;
}
export interface StartLabelDetectionRequest {
    /**
     * <p>The video in which you want to detect labels. The video must be stored
     *       in an Amazon S3 bucket.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *       <code>StartLabelDetection</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>Specifies the minimum confidence that Amazon Rekognition Video must have in order to return a detected label. Confidence
     *        represents how certain Amazon Rekognition is that a label is correctly identified.0 is the lowest confidence.
     *        100 is the highest confidence.  Amazon Rekognition Video doesn't return any labels with a confidence level
     *        lower than this specified value.</p>
     *          <p>If you don't specify <code>MinConfidence</code>, the operation returns labels with confidence
     *      values greater than or equal to 50 percent.</p>
     */
    MinConfidence?: number;
    /**
     * <p>The Amazon SNS topic ARN you want Amazon Rekognition Video to publish the completion status of the label detection
     *         operation to. </p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
}
export declare namespace StartLabelDetectionRequest {
    const filterSensitiveLog: (obj: StartLabelDetectionRequest) => any;
}
export interface StartLabelDetectionResponse {
    /**
     * <p>The identifier for the label detection job. Use <code>JobId</code> to identify the job in
     *     a subsequent call to <code>GetLabelDetection</code>. </p>
     */
    JobId?: string;
}
export declare namespace StartLabelDetectionResponse {
    const filterSensitiveLog: (obj: StartLabelDetectionResponse) => any;
}
export interface StartPersonTrackingRequest {
    /**
     * <p>The video in which you want to detect people. The video must be stored
     *       in an Amazon S3 bucket.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *       <code>StartPersonTracking</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The Amazon SNS topic ARN you want Amazon Rekognition Video to publish the completion status of the people detection
     *         operation to.</p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
}
export declare namespace StartPersonTrackingRequest {
    const filterSensitiveLog: (obj: StartPersonTrackingRequest) => any;
}
export interface StartPersonTrackingResponse {
    /**
     * <p>The identifier for the person detection job. Use <code>JobId</code> to identify the job in
     *     a subsequent call to <code>GetPersonTracking</code>.</p>
     */
    JobId?: string;
}
export declare namespace StartPersonTrackingResponse {
    const filterSensitiveLog: (obj: StartPersonTrackingResponse) => any;
}
export interface StartProjectVersionRequest {
    /**
     * <p>The Amazon Resource Name(ARN) of the model version that you want to start.</p>
     */
    ProjectVersionArn: string | undefined;
    /**
     * <p>The minimum number of inference units to use. A single
     *       inference unit represents 1 hour of processing and can support up to 5 Transaction Pers Second (TPS).
     *       Use a higher number to increase the TPS throughput of your model. You are charged for the number
     *       of inference units that you use.
     *     </p>
     */
    MinInferenceUnits: number | undefined;
}
export declare namespace StartProjectVersionRequest {
    const filterSensitiveLog: (obj: StartProjectVersionRequest) => any;
}
export interface StartProjectVersionResponse {
    /**
     * <p>The current running status of the model. </p>
     */
    Status?: ProjectVersionStatus | string;
}
export declare namespace StartProjectVersionResponse {
    const filterSensitiveLog: (obj: StartProjectVersionResponse) => any;
}
/**
 * <p>Filters for the shot detection segments returned by <code>GetSegmentDetection</code>.
 *       For more information, see <a>StartSegmentDetectionFilters</a>.</p>
 */
export interface StartShotDetectionFilter {
    /**
     * <p>Specifies the minimum confidence that Amazon Rekognition Video must have in order to return a detected segment. Confidence
     *       represents how certain Amazon Rekognition is that a segment is correctly identified. 0 is the lowest confidence.
     *       100 is the highest confidence.  Amazon Rekognition Video doesn't return any segments with a confidence level
     *       lower than this specified value.</p>
     *          <p>If you don't specify <code>MinSegmentConfidence</code>, the <code>GetSegmentDetection</code> returns
     *         segments with confidence values greater than or equal to 50 percent.</p>
     */
    MinSegmentConfidence?: number;
}
export declare namespace StartShotDetectionFilter {
    const filterSensitiveLog: (obj: StartShotDetectionFilter) => any;
}
/**
 * <p>Filters for the technical segments returned by <a>GetSegmentDetection</a>. For more information,
 *       see <a>StartSegmentDetectionFilters</a>.</p>
 */
export interface StartTechnicalCueDetectionFilter {
    /**
     * <p>Specifies the minimum confidence that Amazon Rekognition Video must have in order to return a detected segment. Confidence
     *       represents how certain Amazon Rekognition is that a segment is correctly identified. 0 is the lowest confidence.
     *       100 is the highest confidence.  Amazon Rekognition Video doesn't return any segments with a confidence level
     *       lower than this specified value.</p>
     *          <p>If you don't specify <code>MinSegmentConfidence</code>, <code>GetSegmentDetection</code> returns
     *       segments with confidence values greater than or equal to 50 percent.</p>
     */
    MinSegmentConfidence?: number;
}
export declare namespace StartTechnicalCueDetectionFilter {
    const filterSensitiveLog: (obj: StartTechnicalCueDetectionFilter) => any;
}
/**
 * <p>Filters applied to the technical cue or shot detection segments.
 *       For more information, see <a>StartSegmentDetection</a>.
 *     </p>
 */
export interface StartSegmentDetectionFilters {
    /**
     * <p>Filters that are specific to technical cues.</p>
     */
    TechnicalCueFilter?: StartTechnicalCueDetectionFilter;
    /**
     * <p>Filters that are specific to shot detections.</p>
     */
    ShotFilter?: StartShotDetectionFilter;
}
export declare namespace StartSegmentDetectionFilters {
    const filterSensitiveLog: (obj: StartSegmentDetectionFilters) => any;
}
export interface StartSegmentDetectionRequest {
    /**
     * <p>Video file stored in an Amazon S3 bucket. Amazon Rekognition video start operations such as <a>StartLabelDetection</a> use <code>Video</code> to
     *             specify a video for analysis. The supported file formats are .mp4, .mov and .avi.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple
     *       <code>StartSegmentDetection</code> requests, the same <code>JobId</code> is returned. Use
     *       <code>ClientRequestToken</code> to prevent the same job from being accidently started more than once. </p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The ARN of the Amazon SNS topic to which you want Amazon Rekognition Video to publish the completion status of the
     *       segment detection operation.</p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier you specify that's returned in the completion notification that's published to your Amazon Simple Notification Service topic.
     *       For example, you can use <code>JobTag</code> to group related jobs and identify them in the completion notification.</p>
     */
    JobTag?: string;
    /**
     * <p>Filters for technical cue or shot detection.</p>
     */
    Filters?: StartSegmentDetectionFilters;
    /**
     * <p>An array of segment types to detect in the video. Valid values are TECHNICAL_CUE and SHOT.</p>
     */
    SegmentTypes: (SegmentType | string)[] | undefined;
}
export declare namespace StartSegmentDetectionRequest {
    const filterSensitiveLog: (obj: StartSegmentDetectionRequest) => any;
}
export interface StartSegmentDetectionResponse {
    /**
     * <p>Unique identifier for the segment detection job. The <code>JobId</code> is returned from <code>StartSegmentDetection</code>.
     *     </p>
     */
    JobId?: string;
}
export declare namespace StartSegmentDetectionResponse {
    const filterSensitiveLog: (obj: StartSegmentDetectionResponse) => any;
}
export interface StartStreamProcessorRequest {
    /**
     * <p>The name of the stream processor to start processing.</p>
     */
    Name: string | undefined;
}
export declare namespace StartStreamProcessorRequest {
    const filterSensitiveLog: (obj: StartStreamProcessorRequest) => any;
}
export interface StartStreamProcessorResponse {
}
export declare namespace StartStreamProcessorResponse {
    const filterSensitiveLog: (obj: StartStreamProcessorResponse) => any;
}
/**
 * <p>Set of optional parameters that let you set the criteria text must meet to be included in your response.
 *       <code>WordFilter</code> looks at a word's height, width and minimum confidence. <code>RegionOfInterest</code>
 *       lets you set a specific region of the screen to look for text in.</p>
 */
export interface StartTextDetectionFilters {
    /**
     * <p>Filters focusing on qualities of the text, such as confidence or size.</p>
     */
    WordFilter?: DetectionFilter;
    /**
     * <p>Filter focusing on a certain area of the frame. Uses a <code>BoundingBox</code> object to set the region
     *       of the screen.</p>
     */
    RegionsOfInterest?: RegionOfInterest[];
}
export declare namespace StartTextDetectionFilters {
    const filterSensitiveLog: (obj: StartTextDetectionFilters) => any;
}
export interface StartTextDetectionRequest {
    /**
     * <p>Video file stored in an Amazon S3 bucket. Amazon Rekognition video start operations such as <a>StartLabelDetection</a> use <code>Video</code> to
     *             specify a video for analysis. The supported file formats are .mp4, .mov and .avi.</p>
     */
    Video: Video | undefined;
    /**
     * <p>Idempotent token used to identify the start request. If you use the same token with multiple <code>StartTextDetection</code>
     *       requests, the same <code>JobId</code> is returned. Use <code>ClientRequestToken</code> to prevent the same job
     *         from being accidentaly started more than once.</p>
     */
    ClientRequestToken?: string;
    /**
     * <p>The Amazon Simple Notification Service topic to which Amazon Rekognition publishes the completion status of a video analysis operation. For more information, see
     *             <a>api-video</a>.</p>
     */
    NotificationChannel?: NotificationChannel;
    /**
     * <p>An identifier returned in the completion status published by your Amazon Simple Notification Service topic.  For example, you can use <code>JobTag</code> to group related jobs
     *       and identify them in the completion notification.</p>
     */
    JobTag?: string;
    /**
     * <p>Optional parameters that let you set criteria the text must meet to be included in your response.</p>
     */
    Filters?: StartTextDetectionFilters;
}
export declare namespace StartTextDetectionRequest {
    const filterSensitiveLog: (obj: StartTextDetectionRequest) => any;
}
export interface StartTextDetectionResponse {
    /**
     * <p>Identifier for the text detection job.  Use <code>JobId</code> to identify the job in a subsequent call to <code>GetTextDetection</code>.</p>
     */
    JobId?: string;
}
export declare namespace StartTextDetectionResponse {
    const filterSensitiveLog: (obj: StartTextDetectionResponse) => any;
}
export interface StopProjectVersionRequest {
    /**
     * <p>The Amazon Resource Name (ARN) of the model version that you want to delete.</p>
     *          <p>This operation requires permissions to perform the <code>rekognition:StopProjectVersion</code> action.</p>
     */
    ProjectVersionArn: string | undefined;
}
export declare namespace StopProjectVersionRequest {
    const filterSensitiveLog: (obj: StopProjectVersionRequest) => any;
}
export interface StopProjectVersionResponse {
    /**
     * <p>The current status of the stop operation. </p>
     */
    Status?: ProjectVersionStatus | string;
}
export declare namespace StopProjectVersionResponse {
    const filterSensitiveLog: (obj: StopProjectVersionResponse) => any;
}
export interface StopStreamProcessorRequest {
    /**
     * <p>The name of a stream processor created by <a>CreateStreamProcessor</a>.</p>
     */
    Name: string | undefined;
}
export declare namespace StopStreamProcessorRequest {
    const filterSensitiveLog: (obj: StopStreamProcessorRequest) => any;
}
export interface StopStreamProcessorResponse {
}
export declare namespace StopStreamProcessorResponse {
    const filterSensitiveLog: (obj: StopStreamProcessorResponse) => any;
}
