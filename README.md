## SanCode v2

This's an improvement of sanCode. The original sanCode.


## Report

> Pseudocode
```
1. Retrieve student records using the student endpoint.
2. Retrieve staff records using the staff endpoint.
3. Initialize variables:
    - studentAilmentCounts: an associative array with keys representing specific types of ailments and initial values set to 0.
    - staffAilmentCounts: an associative array with keys representing specific types of ailments and initial values set to 0.
   - studentRedirectToCount: 0
   - studentRedirectFromCount: 0
    - staffRedirectToCount: 0
    - staffRedirectFromCount: 0
    - studentCommunityRedirectCount: 0
    - staffCommunityRedirectCount: 0
4. For each student record:
    a. If the student has a specific type of ailment:
    - Increment the corresponding ailment count in *studentAilmentCounts* by 1.
    b. If the student has been redirected to another health facility:
    - Increment *studentRedirectToCount* by 1.
    c. If the student has been redirected from another health facility:
    - Increment *studentRedirectFromCount* by 1.
    d. If the student has been redirected to and from a community place:
    - Increment *studentCommunityToRedirectCount* and *studentCommunityFromRedirectCount* by 1.
5. For each staff record:
   a. If the staff has a specific type of ailment:
   - Increment the corresponding ailment count in *staffAilmentCounts* by 1.
     b. If the satff has been redirected to another health facility:
   - Increment *staffRedirectToCount* by 1.
     c. If the staff has been redirected from another health facility:
   - Increment *staffRedirectFromCount* by 1.
     d. If the staff has been redirected to and from a community place:
   - Increment *staffCommunityToRedirectCount* and *staffCommunityFromRedirectCount* by 1.
6. Update the report record with the following data:
    - Ailment counts for students: studentAilmentCounts
    - Ailment counts for staff members: staffAilmentCounts
    - Redirect count for students: studentRedirectToCount and studentRedirectFromCount
    - Redirect count for staff members: staffRedirectToCount and studentRedirectFromCount
    - Community redirect count for students: studentCommunityRedirectFromCount and studentCommunityRedirectToCount
    - Community redirect count for staff members: staffCommunityRedirectFromCount and staffCommunityToCount
```