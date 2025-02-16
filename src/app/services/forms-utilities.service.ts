import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsUtilitiesService {

  constructor() { }

/**
   * Validator that prevents malicious content such as HTML tags,
   * inline event handlers, or dangerous protocols (e.g., javascript:)
   */
  public noMaliciousContent(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value) {
      return null; // Let the required validator handle empty values.
    }

    // Regex to detect any HTML tags (e.g. <script>, <iframe>, etc.)
    const htmlTagPattern = /<[^>]*>/i;
    // Regex to catch dangerous inline event handlers or protocols like javascript:
    const dangerousPattern = /(javascript:|onerror\s*=|onload\s*=)/i;
    
    if (htmlTagPattern.test(value) || dangerousPattern.test(value)) {
      return {
        maliciousContent: {
          message: 'Input contains forbidden characters or patterns.'
        }
      };
    }
    return null;
  }
}



