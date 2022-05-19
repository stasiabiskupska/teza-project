namespace Frontier {
    interface Theme {
      primary_color?: string;
      secondary_color?: string;
      background_color?: string;
      text_color?: string;
    }
  
    interface Job {
      theme: Theme;
      sections: Section[];
    }
  
    interface Section {
      title: string;
      id: string; 
      content: Element[];
    }
  
    interface Element {
      id: string;
      question_text: string;
      metadata: ElementMeta;
      type:
        | 'boolean' 
        | 'textarea' 
        | 'text' 
        | 'multichoice'; 
    }
  
    interface ElementMeta {
      required: boolean;
      placeholder?: string;
      options?: { label: string; value: string }[];
      format?: 'text' | 'email' | 'number';
      pattern?: string;
      step?: number;
    }
  }
  