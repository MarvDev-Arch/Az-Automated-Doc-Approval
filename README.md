# Az-Automated-Doc-Approval
# Automated Document Approval System Using Azure Logic Apps

## 📌 Project Overview

The **Automated Document Approval System** is a serverless Azure workflow that automates the process of receiving a document, processing its details, and sending an approval notification.

The solution combines **Azure Blob Storage, Azure Logic Apps, and Azure Functions** to create an event-driven document approval workflow.

### Workflow

```text
Document Upload
      ↓
Azure Blob Storage
      ↓
Azure Logic App Trigger
      ↓
HTTP Request
      ↓
Azure Function
ProcessDocument
      ↓
Get Document Information
      ↓
Approval Email
      ↓
Approve / Reject
