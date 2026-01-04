// Cloud Resume Challenge - Simple Visitor Counter

// Visitor counter functionality
class VisitorCounter {
  constructor(apiEndpoint = null) {
    this.counterElement = document.getElementById("visitor-count");
    this.storageKey = "cloud-resume-visitors";
    this.apiEndpoint = apiEndpoint; // Will be set to your API Gateway endpoint
    this.init();
  }

  async init() {
    try {
      if (this.apiEndpoint) {
        await this.fetchFromAPI();
      } else {
        this.useLocalStorage();
      }
    } catch (error) {
      console.error("Error initializing visitor counter:", error);
      this.useLocalStorage();
    }
  }

  async fetchFromAPI() {
    try {
      const response = await fetch(this.apiEndpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.updateCounter(data || data.visitor_count || 0);
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  useLocalStorage() {
    let count = parseInt(localStorage.getItem(this.storageKey) || "0");

    // Check if this is a new session
    const lastVisit = localStorage.getItem(this.storageKey + "-timestamp");
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (!lastVisit || now - parseInt(lastVisit) > oneHour) {
      count += 1;
      localStorage.setItem(this.storageKey, count.toString());
      localStorage.setItem(this.storageKey + "-timestamp", now.toString());
    }

    this.updateCounter(count);
  }

  updateCounter(count) {
    if (this.counterElement) {
      this.counterElement.textContent = count.toLocaleString();
    }
  }

  // Method to set API endpoint (call this in production)
  setAPIEndpoint(url) {
    this.apiEndpoint = url;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const apiEndpoint =
    "https://yvswltjo4i24p5mhzz22euvep40opgmu.lambda-url.ap-southeast-1.on.aws/"; // Set to your API endpoint in production
  // Core functionality
  const visitorCounter = new VisitorCounter(apiEndpoint);
});
