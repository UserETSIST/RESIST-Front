import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, Observable, of, throwError } from 'rxjs';
import { API_CONFIG } from '../../environments/environment';
import { API_ENDPOINTS } from '../../environments/api-endpoints';
import { ContactFormData } from '../models/contact-forms.model';

@Injectable({
  providedIn: 'root'
})
export class FormsUtilitiesService {


  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }

  /**
     * Validator that prevents malicious content such as HTML tags,
     * inline event handlers, or dangerous protocols (e.g., javascript:)
     */
  public noMaliciousContent(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (!value) {
      return null; // Let the required validator handle empty values.
    }

    // **1. Block HTML tags** (like <script>, <iframe>, <embed>, etc.)
    const htmlTagPattern = /<[^>]*>/i;

    // **2. Block dangerous inline event handlers and javascript protocols**
    const dangerousPattern = /(javascript:|onerror\s*=|onload\s*=)/i;

    // **3. Block SQL injection attempts** (e.g., SELECT, INSERT, UNION, etc.)
    const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|JOIN|ALTER|CREATE|TRUNCATE|EXEC)\b\s+(FROM|INTO|TABLE|WHERE|VALUES)|--|\/\*|\*\/|;)/i;


    // **4. Block common script patterns** (like `<script>`, `<iframe>`, `<object>`, etc.)
    const scriptInjectionPattern = /<script.*?>.*?<\/script>/gi;
    const iframePattern = /<iframe.*?>.*?<\/iframe>/gi;
    const objectPattern = /<object.*?>.*?<\/object>/gi;
    const embedPattern = /<embed.*?>.*?<\/embed>/gi;

    // **5. Block malicious Unicode characters** (like non-printable characters)
    const unicodePattern = /[\u202E\u0000-\u001F\u007F-\u009F]/;

    // **6. Block common path traversal attempts** (e.g., ../)
    const pathTraversalPattern = /(\.\.\/)/i;

    if (
      htmlTagPattern.test(value) ||
      dangerousPattern.test(value) ||
      sqlInjectionPattern.test(value) ||
      scriptInjectionPattern.test(value) ||
      iframePattern.test(value) ||
      objectPattern.test(value) ||
      embedPattern.test(value) ||
      unicodePattern.test(value) ||
      pathTraversalPattern.test(value)
    ) {
      return {
        maliciousContent: {
          message: 'Input contains forbidden characters or patterns.'
        }
      };
    }

    return null;
  }


  public sendContactForm(values: any): Observable<any> {
    const isBrowser = isPlatformBrowser(this.platformId);
    if (!isBrowser) {
      console.warn('⚠ Cannot execute PATCH request on the server side.');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      name: values.first_name + " " + values.last_name,
      email: values.email,
      phone: values.phone,
      message: values.message
    }

    console.log("Headers: ", headers, "Body: ", body)


    return this.http.post<any>(`${this.baseUrl}${API_ENDPOINTS.CONTACT.NEW}`, body, { headers })
      .pipe(
        catchError((error) => {
          console.error('❌ Error during POST request:', error);
          return throwError(() => new Error('Failed to submit contact form.'));
        })
      );
  }



  public getAllContactForms(): Observable<ContactFormData> {
    const tokenType = sessionStorage.getItem('token_type');
    const accessToken = sessionStorage.getItem('access_token');


    if (tokenType && accessToken) {
      console.log("TOKENS AVAILABLE")
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${accessToken}`
      });

      return this.http.get<ContactFormData>(`${this.baseUrl}${API_ENDPOINTS.CONTACT.GET_ALL}`, { headers });

    } else {
      console.warn('⚠ No token found in sessionStorage.');

      return of({
        success: false,
        data: {
          id: null,
          name: '',
          email: '',
          phone: '',
          message: '',
          created_at: ''
        }
      });
    }
  }


}



