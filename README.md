# IoT-based Wearable Cardiovascular Health Surveillance System

This document provides a comprehensive summary of the final year individual project undertaken by Lee Chun Fung Simon for the UWE Bristol BEng Program, highlighting the system architecture, hardware and software design.

This project aims to design and implement a compact, smart wearable device capable of acquiring Electrocardiogram (ECG) and photoplethysmogram (PPG) signals with accuracy and reliability. A significant object of the project is to enhance the early detection and prevention of cardiovascular and respiratory conditions. 

Health surveillance capability will be achieved by continuously monitoring and analysing the patient’s vital signals and cardiovascular health metrics, including Heart Rate Variability (HRV). Several signal processing algorithms are planned to be implemented to calculate real-time vital sign parameters and heart rate variability metrics, providing valuable insights into the wearer’s cardiovascular health status at any given time.

## System Architecture

The implementation for the wearable sensor module will be divided into hardware assembly and microcontroller firmware development. This section provides a comprehensive overview of the architecture and specification, focusing on integrating the ECG and PPG sensors, real-time data processing, HRV metric algorithms and cloud-based connectivity.

The design and implementation of this module are primarily integrated with the ESP32 development board. The critical components of this architecture are the AD8232 ECG sensors and MAX30105 pulse oximeter. The former captures the heart's electrical activity, providing Electrocardiogram readings that range from 0 to 3.3V, depending on the operating voltage. The latter measures blood oxygen saturation level (SpO2) by its integrated red, green, and infrared LED, and a photodetector to measure changes in light absorption when the sensing surface is placed over a patient's fingertip or wrist. The PPG graph is generated for cardiovascular health analysis by the intensity change in the reflected light over time.

<p align="center">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/22eca9aa-1a67-4eab-b039-77f5e86fcfa3">
</p>

## Use Case Diagram
The following diagram provide comprehensive guidelines on how the system should be implemented, configured, and validated to fulfil the project scopes and requirements. 

<p align="center">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/926c601d-b558-4731-8c51-6ce6a703aaf6">
</p>

## Wearabe Module Design

The schematic architecture and interconnection of hardware components is required for assembly. The central processing unit is the ESP32 development board, which is manufactured by Heltec Automation. The assembly process commences with integrating the AD8232 ECG sensor, which is linked via the GPIO Analogue Pin 38. Followed by the attachment of the MAX30105 pulse oximeter, interfaced with the board via the I2C protocol by GPIO SDA PIN 4 and SDL PIN 15. The OLED display uses the same I2C bus as the MAX30105 pulse oximeter. The pulse-width modulation (PWM) buzzer is connected through PIN 12.

<p align="center">
<img width="357" alt="image" src="https://github.com/user-attachments/assets/c823e073-c173-4c1b-92d9-409558430aaa">
</p>

- Graphical layout of the OLED display module with 128 * 64 resolution for displaying the status banner, ECG graph and health metrics.
<p align="center">
<img width="356" alt="image" src="https://github.com/user-attachments/assets/b1ff3c64-321b-461f-8465-7c4559336707">
</p>

## Web Application Design

The web portal user interface (UI) design for a health surveillance system is a critical component that directly impacts user experience, engagement, and the effectiveness of the health monitoring process. Additionally, the web portal serves as a conduit for interaction between patients, healthcare providers, and the system itself. The design should be approached with thorough consideration of accessibility and functionality.
- The wireframe shows the structured layout that visualises the health metrics and status with responsive elements.
<p align="center">
<img width="379" alt="image" src="https://github.com/user-attachments/assets/5d26c7be-5f2f-40c4-ba3f-dd815636b1c1">
</p>

Back-end System Implementation
Firebase is a versatile backend-as-a-service (BaaS) platform developed by Google, which has been chosen as the backend service for the health surveillance system. It offers three main components for implementing the backend services of the health surveillance system: Firebase Authentication, Realtime Database (RTDB), and Hosting. 
To ensure full functionality, back-end related parameters should be carefully verified and aligned across the system. This unified configuration enables a coherent ecosystem where the wearable sensor module can synchronise data to the RTDB, and the web portal can retrieve and display the health data in real time. 
- A JavaScript Object Notation (JSON) structure of hierarchical data used when the health parameters are uploaded from the wearable module to RTDB as below. 
<p align="center">
<img width="350" alt="image" src="https://github.com/user-attachments/assets/ec261998-9e07-439c-a3b6-e683ed70f071">
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

- Connect the wearable module with a 5V power cable until the hardware status and cloud services are ready.
<p align="center">
<img width="313" alt="image" src="https://github.com/user-attachments/assets/908147ca-1f71-4e0c-9c2e-bdbceb9e02bb">
</p>

### Step 2: Web Application 
- Login to the system with the user credentials.
<p align="center">
<img width="432" alt="image" src="https://github.com/user-attachments/assets/7a8fcccb-2b0b-49d3-8b62-3e9dc51b9173">
</p>

- Access the dashboard for real-time monitoring and hardware control.
<p align="center">
<img width="600" alt="image" src="https://github.com/cfleesimon/wearable-heart-monitor/assets/116180413/b9e26f00-fc26-4b2b-95c2-7e1db67c4795">
</p>

## Conclusion
Integrating the Internet of Things (IoT) with Real-Time Operating Systems (RTOS) offers significant advantages in system implementation. It enabled continuous ECG and PPG signal capturing, detailed HRV parameters, and real-time vital signs analysis. The validation and verification process for the cardiovascular health surveillance system involved acceptance testing planning, execution, and in-depth reporting. For improved performance and functionality, it is recommended to advance the system by upgrading sensors and microcontrollers and refining software development practices in the future.




