<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DeviceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
      
        return [
            //'macAddress' => 'required|string|max:255|unique:devices,id,' . $this->id,  
            'macAddress' => 'required|string|max:255|unique:devices,macAddress,' . $this->route('user.device.update'),            
            'ipAddress' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric', 
            'ysnLocation' => 'nullable|boolean',   
            'location' => Rule::requiredIf($this->ysnLocation == true),
              
        ];
    }
}
