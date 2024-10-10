# IoT-based Wearable Cardiovascular Health Surveillance System

This document provides a comprehensive summary of the final year individual project completed by Lee Chun Fung Simon for the UWE Bristol BEng Program, highlighting the system architecture with hardware and software design.

This project aims to design and implement a compact, smart wearable device capable of acquiring Electrocardiogram (ECG) and photoplethysmogram (PPG) signals with accuracy and reliability. A significant object is to enhance the early detection of cardiovascular and respiratory conditions based on patient's vital signals and Heart Rate Variability (HRV) . 

Based on the requirements, five critical parameters are included for measuring cardiovascular health metrics based on ECG data analysis. These parameters provide a comprehensive overview of heart function and monitoring cardiac conditions. These parameters include QRS Interval, RR Interval, Heart Rate, SDNN and RMSSD. The definition and analysis of the parameters are based on the following structure of an ECG signal:

<p align="center">
<img width="350" alt="image" src="https://github.com/user-attachments/assets/195a5917-ec47-49bf-9129-ceda5b43dbc9">
</p>

1.	QRS Interval: The QRS interval represents the required time for the heart's lower chambers and ventricles to depolarise and contract to pump blood out for the body. This depolarisation is the electrical activation that triggers the heart’s main pumping action. The interval is crucial for assessing the heart’s electrical conductivity and can indicate the presence of various cardiac abnormalities.
1.	RR Interval: The RR interval is the time between successive R peaks, the highest point of the ECG waveform corresponding to the depolarisation of the heart’s ventricles. Consistent RR intervals indicate a steady heart rate. In contrast, variability in these intervals may indicate cardiac stress or dysfunction. 
1.	Heart Rate: Heart rate is calculated by counting the number of R peaks in the ECG signal over a given period, typically a minute. 
1.	Standard Deviation of Normal-to-Normal Interval (SDNN): SDNN is a time-domain measure of heart rate variability that determines the standard deviation of NN intervals. NN intervals are the RR intervals excluding any arrhythmic beats. SDNN reflects the overall variability in heart rate and cardiovascular health. The unit of SDNN is millisecond (ms). 
1.	Root Mean Square of Successive Differences (RMSSD): The RMSSD is another time domain measurement of HRV. It focuses on the short-term variations in RR intervals and indicates parasympathetic nervous system activity.

Health surveillance capability will be achieved by continuously monitoring and analysing the patient’s vital signals and Heart Rate Variability (HRV) as cardiovascular health metrics. Several signal processing algorithms are planned to be implemented for real-time calculation of the required health parameters, providing valuable insights into the wearer’s cardiovascular status at a given time.

## System Architecture

The implementation for the wearable sensor module will be divided into hardware assembly and microcontroller firmware development. This section provides a comprehensive overview of the architecture and specification, focusing on integrating the ECG and PPG sensors, real-time data processing, HRV metric algorithms and cloud-based connectivity.

The design and implementation of this module are primarily integrated with the ESP32 microcontroller development board, which is manufactured by Heltec Automation. The critical components of this architecture are the AD8232 ECG sensors and MAX30105 pulse oximeter. The former captures the heart's electrical activity, providing Electrocardiogram readings that range from 0 to 3.3V, depending on the operating voltage. The latter measures blood oxygen saturation level (SpO2) by its integrated red, green, and infrared LED, and a photodetector to measure changes in light absorption when the sensing surface is placed over a patient's fingertip or wrist. The PPG graph is generated for cardiovascular health analysis by the intensity change in the reflected light over time.

<p align="center">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/22eca9aa-1a67-4eab-b039-77f5e86fcfa3">
</p>

## Use Case Diagram
The following diagram provide a high-level view of the system’s functionality and interactions.

<p align="center">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/926c601d-b558-4731-8c51-6ce6a703aaf6">
</p>

## Wearabe Module Design

The schematic architecture and interconnection of hardware components is required for the hardware assembly. The assembly process commences with integrating the AD8232 ECG sensor, which is linked via the general-purpose-input/output (GPIO) Analogue Pin 38. Followed by the attachment of the MAX30105 pulse oximeter, interfaced with the board via the two-wire serial communication (I2C) protocol using a serial data line (SDA) and a serial clock line (SCL) channels through SDA PIN 4 and SDL PIN 15. The OLED display uses the same I2C bus as the MAX30105 pulse oximeter. The pulse-width modulation (PWM) buzzer is connected through GPIO PIN 12.

<p align="center">
<img width="357" alt="image" src="https://github.com/user-attachments/assets/c823e073-c173-4c1b-92d9-409558430aaa">
</p>

- Graphical layout of an OLED display module with 128 * 64 resolution for displaying the status banner, ECG graph and health metrics.
<p align="center">
<img width="356" alt="image" src="https://github.com/user-attachments/assets/b1ff3c64-321b-461f-8465-7c4559336707">
</p>

## Web Application Design

The web portal user interface (UI) design for a health surveillance system is a critical component that directly impacts user experience, engagement, and the effectiveness of the health monitoring process. Additionally, the web portal serves as a conduit for interaction between patients, healthcare providers, and the system itself. The design should be approached with thorough consideration of accessibility and functionality.
- The wireframe displays a layout for health data visualizations, incorporating responsive elements.
<p align="center">
<img width="379" alt="image" src="https://github.com/user-attachments/assets/5d26c7be-5f2f-40c4-ba3f-dd815636b1c1">
</p>

## Back-end System Implementation
Firebase is a versatile backend-as-a-service (BaaS) platform developed by Google, which has been chosen as the backend service for the health surveillance system. It offers three main components for implementing the backend services of the health surveillance system: Firebase Authentication, Realtime Database (RTDB), and Hosting. 
To ensure full functionality, back-end related parameters should be carefully verified and aligned across the system. This unified configuration enables a coherent ecosystem where the wearable sensor module can synchronise data to the RTDB, and the web portal can retrieve and display the health data in real time. 
- Firebase Realtime Database Dashboard view with the JavaScript Object Notation (JSON) structure of hierarchical data used when the health parameters are uploaded from the wearable module to RTDB as below. 
<p align="center">
<img width="800" alt="image" src="https://github.com/user-attachments/assets/6eb9d2ff-b401-4e6b-9275-dbdd458e7051">
</p>

## Application Instructions

### Step 1: Wearable Module Attachment
- Attach the ECG electrodes to our body as the picture below. RA (Right Arm) electrode is placed on the right arm or just below the right clavicle. LA (Left Arm) electrode is placed on the left arm or just below the left clavicle. RL (Right Leg) electrode is placed on the upper right quadrant of the body.
<p align="center">
<img width="160" alt="image" src="https://github.com/user-attachments/assets/05f37ecf-ca78-4e7d-8f2b-621e6503237d">
</p>

- The wearable module is fitted with the patient’s wrist to ensure proper placement of the blood oxygen level sensors.
<p align="center">
<img width="313" alt="image" src="https://github.com/user-attachments/assets/4fad06f7-905f-4d27-89a4-fde558cea411">
</p>

- Connect the wearable module with a 5V power cable until the hardware and backend services are ready.
<p align="center">
<img width="313" alt="image" src="https://github.com/user-attachments/assets/908147ca-1f71-4e0c-9c2e-bdbceb9e02bb">
</p>

### Step 2: Web Application 
- User authentication via the web browser. 
<p align="center">
<img width="432" alt="image" src="https://github.com/user-attachments/assets/7a8fcccb-2b0b-49d3-8b62-3e9dc51b9173">
</p>

- Review the dashboard for real-time health monitoring and hardware control.
<p align="center">
<img width="600" alt="image" src="https://github.com/cfleesimon/wearable-heart-monitor/assets/116180413/b9e26f00-fc26-4b2b-95c2-7e1db67c4795">
</p>

## Conclusion
Integrating the Internet of Things (IoT) with microcontrollers and sensors provides significant advantages in both performance and usability. This application enables continuous ECG and PPG signal capture, detailed HRV parameter analysis, and real-time vital signs monitoring. The validation and verification process for the cardiovascular health surveillance system involved planning and executing acceptance tests, followed by in-depth reporting. For further performance and functionality improvements, it is recommended to enhance the system by upgrading sensors and microcontrollers, as well as refining software development practices in the future.




